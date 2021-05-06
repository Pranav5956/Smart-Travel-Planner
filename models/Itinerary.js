import { mongoose } from "mongoose";

var itinerarySchema = new mongoose.Schema({
  name: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  route: [String],
  hotels: [
    {
      name: String,
      hotelId: String,
      address: String,
      arrivingLeaving: [String],
      atCheckIn: [String],
    },
  ],
  POI: [
    {
      name: String,
      xid: String,
      kinds: String,
    },
  ],
});

export default mongoose.model("Itinerary", itinerarySchema);
