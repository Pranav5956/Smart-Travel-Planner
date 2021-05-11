import axios from "../axios";

export const initializeItinerary = (stops) => {
  return axios.post("/itineraries", { stops });
};

export const getAllItineraries = () => {
  return axios.get("/itineraries");
};

export const getItinerary = (itineraryId) => {
  return axios.get(`/itineraries/${itineraryId}`);
};

export const updateItinerary = (itineraryId, itinerary) => {
  return axios.put(`/itineraries/${itineraryId}`, itinerary);
};

export const removeItinerary = (itineraryId) => {
  return axios.delete(`/itineraries/${itineraryId}`);
};

export const updateItineraryWeights = (itineraryId, weight) => {
  return axios.put(`/itineraries/weights/${itineraryId}`, weight);
};
