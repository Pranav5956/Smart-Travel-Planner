import axios from "axios";
import { poiThumbnails } from "../data/poiThumbnails.js";

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
    console.log(err.response.data, "places");
  }
};

// CALLABLE - pass query with minimum 3 characters for autosuggest
export const getOverview = async (
  city,
  radius = 5000,
  categories,
  autosuggest = 0,
  query
) => {
  if (!categories || categories.length === 0)
    categories = "adult,amusements,interesting_places,sport,tourist_facilities";
  let res = await otmAPI("geoname", `name=${city}`);
  if (!res) return { message: "Cannot retrieve info." };
  if (res.error) return res.error;

  let coordinates = { lat: res.lat, long: res.lon };

  let POI;

  if (autosuggest === 1)
    POI = await otmAPI(
      "autosuggest",
      `radius=${radius}&lon=${coordinates.long}&lat=${coordinates.lat}&name=${query}&kinds=${categories}`
    );
  else
    POI = await otmAPI(
      "radius",
      `radius=${radius}&lon=${coordinates.long}&lat=${coordinates.lat}&kinds=${categories}`
    );

  if (!POI) return { message: "Unable to retrieve info" };
  if (POI.error) return POI.error;

  var allCategories = Object.keys(poiThumbnails);
  POI["features"].forEach(function (place, index) {
    for (var i = 0; i < allCategories.length; i++) {
      if (place["properties"]["kinds"].split(",").includes(allCategories[i])) {
        POI["features"][index]["thumbnail"] =
          poiThumbnails[allCategories[i]] + "&w=140&h=140";
        break;
      }
    }
  });
  return POI["features"]
    .filter((item) => item.properties.name != "")
    .map((item) => ({ ...item, city }));
};
