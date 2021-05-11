import express from "express";
import Itinerary from "../../models/Itinerary.js";
import { updateHotelWeight } from "../../recommender/hotels/recommender.js";
import { updatePOIWeight } from "../../recommender/places/utilities.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ author: req.user.id });
    return res.json({ itineraries });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/:itineraryId", async (req, res) => {
  try {
    const { itineraryId } = req.params;
    const itinerary = await Itinerary.findOne({ _id: itineraryId });
    return res.json({ itinerary });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { stops } = req.body;
    const itineraries = await Itinerary.find({ author: req.user.id });
    const newItinerary = new Itinerary({
      name: `Untitled Itinerary ${itineraries.length + 1}`,
      author: req.user.id,
      route: stops,
    });
    await newItinerary.save();
    return res.json({ itinerary: newItinerary });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});

router.put("/:itineraryId", async (req, res) => {
  try {
    const { itineraryId } = req.params;
    const { name, route, hotels, POI } = req.body;

    const updatedItinerary = await Itinerary.findOneAndUpdate(
      { _id: itineraryId, author: req.user.id },
      {
        name,
        route,
        hotels,
        POI,
      },
      { new: true }
    );
    return res.json({ itinerary: updatedItinerary });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});

router.put("/weights/:itineraryId", async (req, res) => {
  try {
    const { added, removed, saveType } = req.body;

    if (saveType === "hard") {
      console.log(`Hard Save`);
      added.hotels.forEach((hotel) => {
        updateHotelWeight(
          hotel.hotelId,
          hotel.cityID,
          req.user.id,
          0.9,
          hotel.filters
        );
      });

      added.POI.forEach((place) => {
        updatePOIWeight(req.user.id, 0.9, place.xid);
      });
    } else if (saveType === "soft") {
      console.log(`Soft Save`);
      added.hotels.forEach((hotel) => {
        updateHotelWeight(
          hotel.hotelId,
          hotel.cityID,
          req.user.id,
          0.63,
          hotel.filters
        );
      });

      added.POI.forEach((place) => {
        updatePOIWeight(req.user.id, 0.5, place.xid);
      });

      removed.hotels.forEach((hotel) => {
        updateHotelWeight(
          hotel.hotelId,
          hotel.cityID,
          req.user.id,
          0.36,
          hotel.filters
        );
      });

      removed.POI.forEach((place) => {
        updatePOIWeight(req.user.id, 0.1, place.xid);
      });
    }

    return res.status(200).json({});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});

router.delete("/:itineraryId", async (req, res) => {
  try {
    const { itineraryId } = req.params;
    await Itinerary.findOneAndRemove({ _id: itineraryId, author: req.user.id });
    return res.json();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});

export default router;
