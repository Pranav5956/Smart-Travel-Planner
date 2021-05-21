import MonkeyLearn from "monkeylearn";
import scaler from "minmaxscaler";
import UserProfile from "../../models/UserProfile.js";
import Blog from "../../models/Blog.js";

function classifyComment(comment) {
  const ml = new MonkeyLearn(process.env.MONKEYLEARN_API_KEY);
  return new Promise(function (resolve, reject) {
    ml.classifiers
      .classify(process.env.MONKEYLEARN_MODELID, [comment])
      .then((res) => {
        if (res.body[0].error) reject(res.body[0].error_detail);
        else {
          var result = {
            category: res.body[0].classifications[0].tag_name,
            weight: res.body[0].classifications[0].confidence,
          };
          if (result.category == "Negative")
            result.weight = (1 - result.weight) / 2;
          else result.weight = (1 + result.weight) / 2;
          resolve(result);
        }
      });
  });
}

// CALLABLE - calls classifyComment()
export async function getSentiment(comment) {
  var sentiment = await classifyComment(comment);
  return sentiment;
}

function weightedAverage(blogInterest, bVecs, feature, weights, count) {
  var weightedSum = blogInterest[feature] * count;
  bVecs.forEach(function (bVec, index) {
    weightedSum += bVec[feature] * weights[index];
    count += 1;
  });
  return (weightedSum / count).toFixed(3);
}

// CALLABLE - execute when respective interactions are triggered
export async function updateWeight(blogId, userId, level) {
  var profile = await UserProfile.findOne(
    { userId: userId },
    function (err, doc) {
      profile = doc;
    }
  );
  var flag = 0;
  profile["blogs"].forEach((blog) => {
    if (String(blog["blogId"]) == String(blogId)) {
      flag = 1;
      blog["level"] = level;
      blog["timestamp"] = Math.round(new Date().getTime() / 1000);
      blog["evaluated"] = 0;
    }
  });
  if (flag == 0) {
    profile["blogs"].push({
      blogId: blogId,
      level: level,
      timestamp: Math.round(new Date().getTime() / 1000),
      evaluated: 0,
    });
  }
  profile.save(function (err, result) {
    if (err) throw err;
    else console.log("User Profile Updated");
  });
}

// CALLABLE - to be executed on login
export async function updateBlogInterest(userId) {
  var profile,
    blogInterest,
    blogs,
    count = 0;
  var timeWeight = [],
    blogIds = [],
    levelWeight = [],
    bVecs = [];

  profile = await UserProfile.findOne({ userId: userId }, function (err, doc) {
    profile = doc;
  });

  blogInterest = profile["blogInterest"];

  await profile["blogs"].forEach((blog) => {
    if (blog["evaluated"] == 0) {
      timeWeight.push(blog["timestamp"]);
      blogIds.push(blog["blogId"]);
      levelWeight.push(blog["level"]);
    } else count += 1;
  });

  if (timeWeight.length == 1) timeWeight = [1];
  else timeWeight = scaler.fit_transform(timeWeight, 0.1, 0.9);

  function Multiply(a, b) {
    return a.map((e, i) => parseFloat((e * b[i]).toFixed(3)));
  }
  var weights = Multiply(timeWeight, levelWeight);

  // is order maintained?
  blogs = await Blog.find({ _id: { $in: blogIds } }, function (err, docs) {
    blogs = docs;
  });

  blogs.forEach((blog) => {
    bVecs.push({
      cost: blog.cost,
      duration: blog.duration,
      likes: blog.likes.length,
    });
  });

  var features = ["cost", "duration", "likes"];
  features.forEach((feature) => {
    blogInterest[feature] = weightedAverage(
      blogInterest,
      bVecs,
      feature,
      weights,
      count
    );
  });

  await UserProfile.updateMany(
    { "blogs.blogId": { $in: blogIds } },
    {
      $set: {
        "blogs.$[].evaluated": true,
      },
    },
    function () {
      console.log("Status Updated");
    }
  );

  await UserProfile.updateOne(
    { userId: userId },
    { blogInterest: blogInterest },
    function () {
      console.log("Blog Interest Updated");
    }
  );
}

// returns a vector of 40 features
export function vectorize(profile) {
  var iVec = profile.interestVector;
  var POIvec = profile.POIcategories;
  var blogInterest = profile.blogInterest;

  var vector = [];
  vector.push(iVec["stars"], iVec["price"], iVec["guestReview"]);
  var hotelFeatures = ["amenities", "themes", "accessibility"];
  hotelFeatures.forEach((feature) => {
    vector = vector.concat(iVec[feature]);
  });

  POIvec.sort(function (p1, p2) {
    return p2 - p1;
  });
  vector = vector.concat(POIvec);

  var blogFeatures = ["cost", "duration", "likes"];
  blogFeatures.forEach((feature) => {
    vector.push(blogInterest[feature]);
  });
  return vector;
}
