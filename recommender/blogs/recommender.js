import UserProfile from "../../models/UserProfile.js";
import Blog from "../../models/Blog.js";
import { vectorize } from "./utilities.js";
import cosine_similarity from "compute-cosine-similarity";

async function Primary(items, N) {
  var similarUsers = [];
  items.slice(1, N + 1).forEach((item) => {
    similarUsers.push(item[0]);
  });

  var blogObj,
    recBlogs = [];

  blogObj = await UserProfile.find(
    { userId: { $in: similarUsers } },
    { blogs: 1, blogsPosted: 1 },
    function (err, docs) {
      blogObj = docs;
    }
  );

  blogObj.forEach((obj) => {
    obj["blogs"].forEach((blog) => {
      recBlogs.push({
        blogId: blog.blogId,
        weight: blog.level,
      });
    });
  });

  blogObj.forEach((obj) => {
    obj["blogsPosted"].forEach((blog) => {
      recBlogs.push({
        blogId: blog,
        weight: 1,
      });
    });
  });

  recBlogs.sort(function (b1, b2) {
    return b2.weight - b1.weight;
  });

  return recBlogs;
}

// display blogs with highest likes
async function Secondary(userId) {
  var blogs,
    recBlogs = [];
  blogs = await Blog.find(
    { author: { $ne: userId } },
    { _id: 1, likes: 1 },
    function (err, docs) {
      blogs = docs;
    }
  );
  blogs.sort(function (b1, b2) {
    return b2.likes.length - b1.likes.length;
  });
  blogs.forEach((blog) => {
    recBlogs.push({ blogId: blog["_id"] });
  });
  return recBlogs;
}

// CALLABLE - returns a list of blog IDs
export async function recommendBlogs(userId) {
  var targetProfile,
    simScores = {},
    N = 5,
    threshold = 0.8,
    recommended,
    profiles;
  var requiredFields = { interestVector: 1, POIcategories: 1, blogInterest: 1 };

  targetProfile = await UserProfile.findOne(
    { userId: userId },
    requiredFields,
    function (err, docs) {
      targetProfile = docs;
    }
  );

  profiles = await UserProfile.find({}, requiredFields, function (err, docs) {
    profiles = docs;
  });

  if (profiles.length < N) {
    console.log("Resorting to Secondary recommender");
    recommended = await Secondary(userId);
  } else {
    var userVector = vectorize(targetProfile);

    profiles.forEach((profile) => {
      var id = profile["_id"];
      var vec = vectorize(profile);
      console.log(vec, userVector);
      simScores[id] = cosine_similarity(userVector, vec);
    });
    var items = Object.keys(simScores).map(function (key) {
      return [key, simScores[key]];
    });
    items.sort(function (first, second) {
      return second[1] - first[1];
    });

    if (items[1] < threshold) {
      console.log("Resorting to Secondary recommender");
      recommended = await Secondary(userId);
    } else {
      console.log("Using Primary recommender");
      recommended = await Primary(items, N);
    }
  }
  return recommended;
}
