import mongoose from "mongoose";

var itinerarySchema = new mongoose.Schema(
  {
    name: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    route: [
      {
        name: String,
        coordinates: [Number, Number],
      },
    ],
    hotels: [
      {
        name: String,
        thumbnail: String,
        hotelId: String,
        cityId: String,
        filters: {},
        address: String,
        checkin_date: String,
        checkout_date: String,
        adults_number: Number,
        stopName: String,
      },
    ],
    POI: [
      {
        name: String,
        thumbnail: String,
        xid: String,
        kinds: String,
        stopName: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("itineraries", itinerarySchema);
