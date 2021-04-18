import express from "express";
import { getOverview, getDetails } from "../../api/hotels.js";
import { recommendHotels } from "../../recommender/hotels/recommender.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { city, filters } = req.body;

  const data = await getOverview(city, filters);
  res.json(data);
});

router.post("/recommend", async (req, res) => {
  const { city, filters } = req.body;
  const data = await recommendHotels(req.user.id, city, filters);
  res.json(data);
});

router.post("/:hotelId", async (req, res) => {
  const { hotelId } = req.params;
  const { filters } = req.body;
  const data = await getDetails(hotelId, filters);
  res.json(data);
});

export default router;
