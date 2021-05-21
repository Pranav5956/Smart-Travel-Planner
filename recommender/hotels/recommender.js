import Hotel from "../../models/Hotel.js";
import UserProfile from "../../models/UserProfile.js";
import {
  addHotel,
  weightedAverage,
  weightedCount,
  updateFilter,
  vectorize,
} from "./utilities.js";
import scaler from "minmaxscaler";
import cosine_similarity from "compute-cosine-similarity";
import { getHotels, getCityInfo } from "../../api/hotels.js";

export const updateHotelWeight = async (
  hotelId,
  cityId,
  userId,
  level,
  filters
) => {
  try {
    // check if hotel exists in DB, else add
    Hotel.find({ hotelId: hotelId }, function (err, doc) {
      if (doc.length == 0) addHotel(hotelId, filters);
    });

    // locate user in DB, update hotelId to given level
    var profile = await UserProfile.findOne({ userId: userId });

    if (!profile) return;

    var flag = 0;
    const amenity_ids = filters["amenity_ids"]?.split(",") || [];
    const theme_ids = filters["theme_ids"]?.split(",") || [];

    profile.hotels.forEach((hotel) => {
      if (hotel.hotelId == hotelId) {
        flag = 1;
        hotel = {
          ...hotel,
          level,
          timestamp: Math.round(new Date().getTime() / 1000),
          amenity_ids,
          theme_ids,
          evaluated: 0,
        };
      }
    });
    if (flag == 0)
      profile.hotels.push({
        hotelId,
        cityId,
        level,
        timestamp: Math.round(new Date().getTime() / 1000),
        amenity_ids,
        theme_ids,
        evaluated: 0,
      });

    await profile.save();
  } catch (err) {
    console.log(err.message);
  }
};

// Run function on login
// CALLABLE FUNCTION - updates the interest vector of the user at the start of a session
export const updateInterestVector = async (userId) => {
  var profile = await UserProfile.findOne({ userId: userId });

  var iVec = profile["interestVector"],
    timeWeight = [],
    hotelIds = [],
    levelWeight = [],
    count = 0;
  var facilityFilters = iVec["facilityFilters"],
    themeFilters = iVec["themeFilters"];
  var amenityIds = [],
    themeIds = [];

  await profile["hotels"].forEach((hotel) => {
    if (hotel["evaluated"] == false) {
      console.log(1);
      timeWeight.push(hotel["timestamp"]);
      hotelIds.push(hotel["hotelId"]);
      levelWeight.push(hotel["level"]);
      amenityIds = amenityIds.concat(hotel["amenity_ids"]);
      themeIds = themeIds.concat(hotel["theme_ids"]);
    } else count += 1;
  });
  if (timeWeight.length == 1) timeWeight = [1];
  else timeWeight = scaler.fit_transform(timeWeight, 0.1, 0.9);

  var fVecs = await Hotel.find(
    { hotelId: { $in: hotelIds } },
    function (err, docs) {
      fVecs = docs;
    }
  );

  iVec["facilityFilters"] = updateFilter(facilityFilters, amenityIds);
  iVec["themeFilters"] = updateFilter(themeFilters, themeIds);

  var avgFeatures = ["stars", "price", "guestReview"];
  var countFeatures = ["amenities", "themes", "accessibility"];

  avgFeatures.forEach((feature) => {
    iVec[feature] = weightedAverage(
      iVec,
      fVecs,
      feature,
      timeWeight,
      levelWeight,
      count
    );
  });

  countFeatures.forEach((feature) => {
    iVec[feature] = weightedCount(
      iVec,
      fVecs,
      feature,
      timeWeight,
      levelWeight
    );
  });

  await UserProfile.updateMany(
    { "hotels.hotelId": { $in: hotelIds } },
    {
      $set: {
        "hotels.$[].evaluated": true,
      },
    },
    function () {
      console.log("Status Updated");
    }
  );

  await UserProfile.updateOne(
    { userId: userId },
    { interestVector: iVec },
    function () {
      console.log("Interest Vector Updated");
    }
  );
};

// Primary recommender - uses user similarity
const Primary = async (items, cityId, N, filters) => {
  const similarUsers = items.slice(1, N + 1).map((item) => item[0]);

  var hotelObj = await UserProfile.find(
    { _id: { $in: similarUsers } },
    "hotels",
    (err, docs) => {
      hotelObj = docs;
    }
  );

  var hotelIds = [];
  hotelObj.forEach((Obj) => {
    Obj["hotels"].forEach((hotel) => {
      if (hotel["cityId"] === cityId) hotelIds.push(hotel["hotelId"]);
    });
  });

  hotelIds = hotelIds.filter((id, pos) => {
    return hotelIds.indexOf(id) == pos;
  });
  var hotels = await getHotels(cityId, filters, hotelIds, 1);
  return hotels;
};

// Seconday recommender - uses API
const Secondary = async (userId, cityId, filters) => {
  var profile = await UserProfile.findOne(
    { userId: userId },
    function (err, doc) {
      profile = doc;
    }
  );
  var facilities = profile["interestVector"]["facilityFilters"].join(",");
  var themes = profile["interestVector"]["themeFilters"].join(",");
  var Ids = [];
  profile["hotels"].forEach((hotel) => {
    Ids.push(hotel["hotelId"]);
  });
  var fVecs = await Hotel.find({ hotelId: { $in: Ids } }, function (err, docs) {
    fVecs = docs;
  });
  var starAvg = 0,
    priceMax = 0;
  fVecs.forEach((fVec) => {
    starAvg += fVec["stars"];
    if (priceMax < fVec["price"]) priceMax = fVec["price"];
  });
  starAvg = starAvg / fVecs.length;
  starAvg = Math.round(starAvg);

  var starRatings;
  if (starAvg === 5) starRatings = [3, 4, 5];
  else if (starAvg === 1) starRatings = [1, 2, 3];
  else starRatings = [starAvg - 1, starAvg, starAvg + 1];

  if (!starAvg) starRatings = [1, 2, 3, 4, 5];

  var flag = 1,
    hotels = {};
  while (flag) {
    let queryString = {
      ...filters,
      price_max: (Math.round(priceMax) === 0
        ? 100000
        : Math.round(priceMax)
      ).toString(),
      star_rating_ids: starRatings.join(","),
    };
    if (facilities.length != 0) queryString["amenity_ids"] = facilities;
    if (themes.length != 0) queryString["theme_ids"] = themes;
    hotels = await getHotels(cityId, queryString, [], 2);
    if (!hotels || hotels.length === 0) {
      console.log("No results found, prioritizing...");
      var priorities = ["2048", "128", "64", "527", "65536", "25", "14"];
      facilities = facilities
        .split(",")
        .filter((value) => priorities.includes(value))
        .join(",");
      themes = themes
        .split(",")
        .filter((value) => priorities.includes(value))
        .join(",");
    } else flag = 0;
  }
  return hotels;
};

// CALLABLE FUNCTION - recommends hotels for a given user and city
// Adjust value of N and threshold as required
export const recommendHotels = async (userId, city, filters) => {
  const cityDetails = await getCityInfo(city);
  if (!cityDetails || !cityDetails.details?.destinationId)
    return { message: "Unable to retrieve city information!" };

  const cityId = cityDetails.details?.destinationId;

  var simScores = {},
    N = 5,
    threshold = 0.8;
  var iVec = await UserProfile.findOne(
    { userId: userId },
    "interestVector",
    function (err, doc) {
      iVec = doc;
    }
  );
  var ivectors = await UserProfile.find(
    { "hotels.cityId": cityId },
    "interestVector",
    function (err, docs) {
      ivectors = docs;
    }
  );
  if (ivectors.length < N) {
    console.log("Resorting to Secondary Recommender");
    return await Secondary(userId, cityId, filters);
  } else {
    iVec = vectorize(iVec["interestVector"]);
    ivectors.forEach((ivector) => {
      var id = ivector["_id"];
      ivector = vectorize(ivector["interestVector"]);
      simScores[id] = cosine_similarity(iVec, ivector);
    });

    var items = Object.keys(simScores).map(function (key) {
      return [key, simScores[key]];
    });
    items.sort(function (first, second) {
      return second[1] - first[1];
    });
    if (items[1] < threshold) {
      console.log("Resorting to Secondary recommender");
      return await Secondary(userId, cityId, filters);
    } else {
      console.log("Using Primary recommender");
      return await Primary(items, cityId, N, filters);
    }
  }
};
