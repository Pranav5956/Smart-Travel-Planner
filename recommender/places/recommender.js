import UserProfile from "../../models/UserProfile.js";
import scaler from "minmaxscaler";

export const recommendCategories = async (userId) => {
  var times = [],
    lvls = [],
    POI = {},
    categories = [],
    query = [],
    profile;
  try {
    profile = await UserProfile.findOne(
      { userId: userId },
      function (err, doc) {
        if (err) throw err;
        else profile = doc;
      }
    );

    profile["POI"].forEach((place) => {
      times.push(place["timestamp"]);
      lvls.push(place["level"]);
      categories.push(place["categories"]);
    });
    if (times.length == 1) times = [1];
    else times = scaler.fit_transform(times, 0.1, 0.9);
    function Multiply(a, b) {
      return a.map((e, i) => parseFloat((e * b[i]).toFixed(3)));
    }
    var weights = Multiply(times, lvls);

    categories.forEach(function (group, index) {
      group.forEach((category) => {
        if (!Object.keys(POI).includes(category))
          POI[category] = weights[index];
        else if (POI[category] < weights[index]) POI[category] = weights[index];
      });
    });
    POI = Object.keys(POI).map(function (key) {
      return [key, POI[key]];
    });

    POI.sort(function (first, second) {
      return second[1] - first[1];
    });
    POI.forEach((place) => {
      query.push(place[0]);
    });
  } catch (error) {
    console.log(error);
  }

  // Added to store recommendations
  await UserProfile.updateOne({ userId: userId }, { poiCategories: query });
  return query;
};
