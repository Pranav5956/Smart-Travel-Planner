import mongoose from "mongoose";

var userProfileSchema = new mongoose.Schema({
  userId: String,
  hotels: [
    {
      hotelId: String,
      cityId: String,
      level: Number,
      timestamp: Number,
      amenity_ids: [String],
      theme_ids: [String],
      evaluated: Boolean,
    },
  ],
  interestVector: {
    stars: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    guestReview: { type: Number, default: 0 },
    amenities: {
      type: [Number],
      default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    themes: { type: [Number], default: [0, 0, 0, 0, 0, 0] },
    accessibility: { type: [Number], default: [0, 0, 0, 0, 0, 0, 0, 0] },
    facilityFilters: { type: [Number], default: [] },
    themeFilters: { type: [Number], default: [] },
  },
});

export default mongoose.model("user-profiles", userProfileSchema);
