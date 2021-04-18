import mongoose from "mongoose";

var hotelSchema = new mongoose.Schema({
  hotelId: String,
  stars: Number,
  price: Number,
  guestReview: Number,
  amenities: String,
  themes: String,
  accessibility: String,
  timestamp: Number,
});

export default mongoose.model("hotels", hotelSchema);
