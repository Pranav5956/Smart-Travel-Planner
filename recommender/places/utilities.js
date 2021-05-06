import axios from "axios";
import UserProfile from "../../models/UserProfile.js";

const OTMAPI_BASEURL = "https://api.opentripmap.com/0.1/en/places/";

const otmAPI = async (method, query) => {
  let otmapi_url = OTMAPI_BASEURL + method;
  if (method == "xid") {
    otmapi_url += query;
    otmapi_url += "?apikey=" + process.env.OTMAPI_KEY;
  } else if (query !== undefined) {
    otmapi_url += "?apikey=" + process.env.OTMAPI_KEY;
    otmapi_url += "&" + query;
  }

  try {
    const response = await axios.get(otmapi_url);
    const data = response.data;

    return data;
  } catch (err) {
    console.log(err.response.data);
  }
};

export const getPlaceInfo = async (xid) => {
  let res = await otmAPI("xid", `/${xid}`);

  if (!res) return { message: `Unable to retrieve 'xid' info of ${xid}` };

  let info = {
    xid: res.xid,
    name: res.name,
    address: res.address,
    kinds: res.kinds,
    point: res.point,
  };

  return info;
};

export const recommendCategories = (userId) => {
  var times = [],
    lvls = [],
    POI = {},
    categories = [],
    query = [];
  try {
    profile = await UserProfile.findOne({ userId: userId }, function (err, doc) {
      if (err) throw err;
      else profile = doc;
    });

    profile["POI"].forEach((place) => {
      times.push(place["timestamp"]);
      lvls.push(place["level"]);
      categories.push(place["categories"]);
    });
    if (times.length == 1) times = [1];
    else times = scaler.fit_transform(times, (max_ = 0.9), (min_ = 0.1));
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
  return query;
}

// CALLABLE - execute on login
export const updateWeight = (userId, level, xid) => {
  try {
    var profile = await UserProfile.findOne(
      { userId: userId },
      function (err, doc) {
        if (err) throw err;
        else profile = doc;
      }
    );
    var flag = 0;
    profile["POI"].forEach((place) => {
      if (place["xid"] == xid) {
        flag = 1;
        place["level"] = level;
        place["timestamp"] = Math.round(new Date().getTime() / 1000);
      }
    });
    if (flag == 0) {
      let info = await getPlaceInfo(xid);
      profile["POI"].push({
        xid: xid,
        level: level,
        categories: info["kinds"].split(","),
        timestamp: Math.round(new Date().getTime() / 1000),
      });
    }
    profile.save(function (err, result) {
      if (err) throw err;
      else console.log("User Profile Updated");
    });
  } catch (err) {
    console.log(err);
  }
}
