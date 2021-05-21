import { getDetails } from "../../api/hotels.js";
import Hotel from "../../models/Hotel.js";
import UserProfile from "../../models/UserProfile.js";

// Initialize user profiles
export const initializeUserProfile = async (userId) => {
  await UserProfile({
    userId,
    hotels: [],
  }).save();
};

// generates the feature vector for the given hotel
const generateFeatureVector = (hotel) => {
  var vector = {
    hotelId: hotel.hotelId,
    stars: hotel.stars,
    price: parseInt(hotel.featuredPrice.slice(1)),
    guestReview: hotel.avgGuestReviews,
  };

  var amenities = {},
    themes = {},
    accessibility = {},
    flag,
    hotelAmenities = hotel["amenities"][0]["listItems"],
    roomAmenities = hotel["amenities"][1]["listItems"];
  themes["25"] = 0;
  hotelAmenities.forEach((item) => {
    if (item["heading"] === "Taking the kids?") {
      themes["25"] = 1;

      flag = 0;
      item["listItems"].forEach((element) => {
        if (element.includes("childcare")) flag = 1;
      });
      if (flag === 1) amenities["521"] = 1;
      else amenities["521"] = 0;
    }
    if (item["heading"] === "Services") {
      if (item["listItems"].includes("24-hour front desk"))
        amenities["2063"] = 1;
      else amenities["2063"] = 0;

      if (item["listItems"].includes("Designated smoking areas"))
        amenities["537"] = 1;
      else amenities["537"] = 0;
    }

    if (item["heading"] === "Food and drink") {
      if (item["listItems"].includes("Bar/lounge")) amenities["515"] = 1;
      else amenities["515"] = 0;

      if (item["listItems"].includes("Free buffet breakfast daily"))
        amenities["2048"] = 1;
      else amenities["2048"] = 0;

      flag = 0;
      item["listItems"].forEach((element) => {
        if (element.includes("restaurants")) flag = 1;
      });
      if (flag === 1) amenities["256"] = 1;
      else amenities["256"] = 0;
    }

    if (item["heading"] === "Things to do") {
      flag = 0;
      item["listItems"].forEach((element) => {
        if (element.toLowerCase().includes("pool")) flag = 1;
      });
      if (flag === 1) amenities["128"] = 1;
      else amenities["128"] = 0;

      flag = 0;
      item["listItems"].forEach((element) => {
        if (element.toLowerCase().includes("spa")) flag = 1;
      });
      if (flag === 1) {
        amenities["539"] = 1;
        themes["27"] = 1;
      } else {
        amenities["539"] = 0;
        themes["27"] = 1;
      }

      flag = 0;
      item["listItems"].forEach((element) => {
        if (element.toLowerCase().includes("fitness")) flag = 1;
      });
      if (flag === 1) amenities["2"] = 1;
      else amenities["2"] = 0;

      flag = 0;
      item["listItems"].forEach((element) => {
        if (element.toLowerCase().includes("beach")) flag = 1;
      });
      if (flag === 1) themes["6"] = 1;
      else themes["6"] = 0;

      flag = 0;
      item["listItems"].forEach((element) => {
        if (element.toLowerCase().includes("casino")) flag = 1;
      });
      if (flag === 1) {
        amenities["2112"] = 1;
        themes["8"] = 1;
      } else {
        amenities["2112"] = 0;
        themes["8"] = 0;
      }
    }

    if (item["heading"] === "Working away") {
      flag = 0;
      item["listItems"].forEach((element) => {
        if (element.toLowerCase().includes("business")) flag = 1;
      });
      if (flag === 1) {
        amenities["519"] = 1;
        themes["14"] = 1;
      } else {
        amenities["519"] = 0;
        themes["14"] = 0;
      }

      flag = 0;
      item["listItems"].forEach((element) => {
        if (element.toLowerCase().includes("conference")) flag = 1;
      });
      if (flag === 1) amenities["1"] = 1;
      else amenities["1"] = 0;
    }

    if (item["heading"] === "Accessibility") {
      if (item["listItems"].includes("Braille or raised signage"))
        accessibility["4194304"] = 1;
      else accessibility["4194304"] = 0;

      if (item["listItems"].includes("Assistive listening devices available"))
        accessibility["2097152"] = 1;
      else accessibility["2097152"] = 0;

      if (item["listItems"].includes("Accessible bathroom"))
        accessibility["131072"] = 1;
      else accessibility["131072"] = 0;

      if (item["listItems"].includes("In-room accessibility"))
        accessibility["1048576"] = 1;
      else accessibility["1048576"] = 0;

      if (item["listItems"].includes("Wheelchair accessible"))
        accessibility["541"] = 1;
      else accessibility["541"] = 0;

      if (item["listItems"].includes("Wheelchair-accessible path of travel"))
        accessibility["65536"] = 1;
      else accessibility["65536"] = 0;

      if (item["listItems"].includes("Wheelchair-accessible parking"))
        accessibility["524288"] = 1;
      else accessibility["524288"] = 0;

      if (item["listItems"].includes("Roll-in shower"))
        accessibility["262144"] = 1;
      else accessibility["262144"] = 0;
    }
  });

  roomAmenities.forEach((item) => {
    if (item["heading"] === "Freshen up") {
      var flag = 0;
      item["listItems"].forEach((element) => {
        if (element.includes("bathtub")) flag = 1;
      });
      if (flag === 1) amenities["517"] = 1;
      else amenities["517"] = 0;
    }
    if ((item["heading"] = "More")) {
      if (
        item["listItems"].includes("Connecting/adjoining rooms available") ===
        true
      )
        amenities["523"] = 1;
      else amenities["523"] = 0;
    }
  });

  if (
    hotel["atAGlance"]["travellingOrInternet"]["travelling"][
      "pets"
    ][0].includes("No pets")
  )
    amenities["64"] = 0;
  else amenities["64"] = 1;

  if (
    hotel["atAGlance"]["travellingOrInternet"]["internet"][0].includes(
      "Free WiFi"
    )
  )
    amenities["527"] = 1;
  else amenities["527"] = 0;

  if (
    hotel["atAGlance"]["transportAndOther"]["transport"]["transfers"].includes(
      "Airport shuttle (available 24 hours)*"
    )
  )
    amenities["513"] = 1;
  else amenities["513"] = 0;

  if (
    hotel["atAGlance"]["transportAndOther"]["transport"]["parking"].length != 0
  )
    amenities["16384"] = 1;
  else amenities["16384"] = 0;

  if (hotel["stars"] >= 4) themes["15"] = 1;
  else themes["15"] = 0;

  vector["amenities"] = Object.values(amenities).toString();
  vector["themes"] = Object.values(themes).toString();
  vector["accessibility"] = Object.values(accessibility).toString();
  vector["timestamp"] = Math.round(new Date().getTime() / 1000);

  return vector;
};

// Adds a hotel to the DB if it does not already exist
export const addHotel = async (hotelId, filters) => {
  //add hotel feature vector to hotel DB
  const hotelDetails = await getDetails(hotelId, filters);

  if (hotelDetails.message) return;

  const featureVector = generateFeatureVector(hotelDetails, filters);
  await new Hotel(featureVector).save();
};

// returns the weighted avg of features like price,stars and guestReview
export const weightedAverage = (
  interestVector,
  featureVectors,
  feature,
  timeWeight,
  levelWeight,
  count
) => {
  var weightedSum = interestVector[feature] * count;
  console.log(
    interestVector,
    featureVectors,
    feature,
    timeWeight,
    levelWeight,
    count
  );
  featureVectors.forEach(function (fVec, index) {
    weightedSum += fVec[feature] * timeWeight[index] * levelWeight[index];
    count += 1;
    console.log(count);
  });
  console.log(weightedSum);
  return (weightedSum / count).toFixed(3);
};

// returns the weighted count of features like amenitites, themes, accessibility
export const weightedCount = (
  interestVector,
  featureVectors,
  feature,
  timeWeight,
  levelWeight
) => {
  var ft = interestVector[feature],
    newft = [];
  ft.forEach(function (wtCount, index) {
    featureVectors.forEach(function (fVec, i) {
      var val = parseInt(fVec[feature].split(",")[index]);
      if (val == 1) wtCount = wtCount + timeWeight[i] * levelWeight[i];
      else wtCount = wtCount - timeWeight[i] * levelWeight[i];
    });
    newft.push(wtCount.toFixed(3));
  });
  return newft;
};

// updates the list of filters used by the user
export const updateFilter = (filters, newIds) => {
  Array.prototype.byCount = function () {
    var itm,
      a = [],
      L = this.length,
      o = {};
    for (var i = 0; i < L; i++) {
      itm = this[i];
      if (!itm) continue;
      if (o[itm] == undefined) o[itm] = 1;
      else ++o[itm];
    }
    for (var p in o) a[a.length] = p;
    return a.sort(function (a, b) {
      return o[b] - o[a];
    });
  };
  filters = filters.concat(newIds);
  filters = filters.byCount();
  return filters;
};

// converts the interest vector into a single array of numbers
export const vectorize = (vec) => {
  var vector = [];
  vector.push(vec["stars"], vec["price"], vec["guestReview"]);
  var features = ["amenities", "themes", "accessibility"];
  features.forEach((feature) => {
    vector = vector.concat(vec[feature]);
  });
  return vector;
};
