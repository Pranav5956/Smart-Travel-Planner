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
    facilityFilters: { type: [String], default: [] },
    themeFilters: { type: [String], default: [] },
  },
  POI: [
    {
      xid: String,
      level: Number,
      timestamp: Number,
      categories: [String],
    },
  ],
  blogs: [
    {
      blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
      level: Number,
      timestamp: Number,
      evaluated: Boolean,
    },
  ],
  POIcategories: { type: [Number], default: [0, 0, 0] },
  blogInterest: {
    cost: 0,
    duration: 0,
    likes: 0,
  },
  blogsPosted: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
});

export default mongoose.model("user-profiles", userProfileSchema);
