import axios from "axios";

// OVERVIEW
export const getHotels = async (id, filters, hotelIds = [], invoker = 0) => {
  const params = {
    locale: "en_US",
    currency: "USD",
    destination_id: id,
    ...filters,
  };
  const config = {
    params,
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": "hotels-com-provider.p.rapidapi.com",
      useQueryString: true,
    },
  };

  try {
    const response = await axios.get(
      "https://hotels-com-provider.p.rapidapi.com/v1/hotels/search",
      config
    );
    const data = response.data;
    const hotels = data.searchResults.results.map((hotel) => ({
      id: hotel.id,
      name: hotel.name,
      stars: hotel.starRating,
      address: ["streetAddress", "locality", "countryName"]
        .map((field) => hotel.address[field])
        .filter((field) => !!field)
        .join(", "),
      avgGuestReviews: hotel.guestReviews?.rating || 0,
      landmarks: hotel.landmarks,
      thumbnail: hotel.optimizedThumbUrls.srpDesktop,
      price: hotel.ratePlan.price.current,
      coordinates: hotel.coordinate,
    }));

    if (invoker === 1)
      return hotels.filter((hotel) => hotelIds.includes(hotel.id));

    return hotels;
  } catch (err) {
    console.log(err.response.data, 1);
  }
};

export const getCityInfo = async (city) => {
  const params = {
    currency: "USD",
    locale: "en_US",
    query: city,
  };
  const config = {
    params,
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": "hotels-com-provider.p.rapidapi.com",
      useQueryString: true,
    },
  };

  try {
    const response = await axios.get(
      "https://hotels-com-provider.p.rapidapi.com/v1/destinations/search",
      config
    );
    const data = response.data;

    return {
      details: data.suggestions[0]?.entities[0],
      defaultHotels: data.suggestions[1]?.entities,
    };
  } catch (err) {
    console.log(err.response.data, 2);
  }
};

export const getOverview = async (city, filters) => {
  const cityDetails = await getCityInfo(city);

  if (!cityDetails || !cityDetails.details?.destinationId)
    return { message: "Unable to retrieve city information!" };

  const hotelsOverview = await getHotels(
    cityDetails.details.destinationId,
    filters
  );
  if (!hotelsOverview)
    return { message: "Unable to retrieve hotel information!" };

  return hotelsOverview;
};

// DETAILS
const getMoreInfo = async (hotelId, filters) => {
  const config = {
    params: {
      hotel_id: hotelId,
      locale: "en_US",
      currency: "USD",
      ...filters,
    },
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": "hotels-com-provider.p.rapidapi.com",
      useQueryString: true,
    },
  };

  try {
    const response = await axios.get(
      "https://hotels-com-provider.p.rapidapi.com/v1/hotels/booking-details",
      config
    );
    const data = response.data;

    return {
      name: data.name,
      hotelId: data.header.hotelId,
      cityId: data.header.destinationId,
      tagline: data.tagline,
      address: data.address.fullAddress,
      stars: data.starRating,
      freebies: data.freebies,
      featuredPrice: data.featuredPrice.currentPrice.formatted,
      avgGuestReviews: data.reviews.brands?.rating || 0,
      atAGlance: data.atAGlance,
      amenities: data.amenities,
      optionalExtras: data.smallPrint.optionalExtras,
      specialFeatures: data.specialFeatures,
    };
  } catch (err) {
    console.log(err.response.data, 3);
  }
};

const getPhotos = async (hotelId) => {
  const config = {
    params: { hotel_id: hotelId },
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": "hotels-com-provider.p.rapidapi.com",
      useQueryString: true,
    },
  };

  try {
    const response = await axios.get(
      "https://hotels-com-provider.p.rapidapi.com/v1/hotels/photos",
      config
    );
    const data = response.data;

    return data.map((photo) => photo.mainUrl);
  } catch (err) {
    console.log(err.response.data, 4);
  }
};

const getReviews = async (hotelId) => {
  const config = {
    params: { locale: "en_US", hotel_id: hotelId },
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": "hotels-com-provider.p.rapidapi.com",
      useQueryString: true,
    },
  };

  try {
    const response = await axios.get(
      "https://hotels-com-provider.p.rapidapi.com/v1/hotels/reviews",
      config
    );
    const data = response.data;
    const overview = data.overview;

    return {
      overallRating: overview.overall,
      hotelService: overview.hotelService,
      roomComfort: overview.roomComfort,
      hotelCondition: overview.hotelCondition,
      cleanliness: overview.cleanliness,
      neighbourhood: overview.neighbourhood,
      reviews: data.groupReview[0]?.reviews || [],
    };
  } catch (err) {
    console.log(err.response.data, 5);
  }
};

export const getDetails = async (hotelId, filters) => {
  const hotelDetails = await getMoreInfo(hotelId, filters);
  if (!hotelDetails) return { message: "Unable to retrieve hotel details!" };

  const photos = await getPhotos(hotelId);
  const reviews = await getReviews(hotelId);

  return {
    ...hotelDetails,
    photos: photos || [],
    reviews: reviews || [],
  };
};
