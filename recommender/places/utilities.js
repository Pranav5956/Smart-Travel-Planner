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

// CALLABLE - execute on login
export const updatePOIWeight = async (userId, level, xid) => {
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
    await profile.save();
  } catch (err) {
    console.log(err);
  }
};
