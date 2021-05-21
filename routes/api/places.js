import express from "express";
import { getOverview } from "../../api/places.js";
import { recommendCategories } from "../../recommender/places/recommender.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { city, radius, categories, query } = req.body;
  console.log(query);

  const data = await getOverview(
    city,
    radius,
    categories,
    query.length > 0 ? 1 : 0,
    query
  );
  res.json(data);
});

router.post("/recommend", async (req, res) => {
  let data = await recommendCategories(req.user.id);
  if (!data || data.length === 0)
    data = [
      "adult",
      "amusements",
      "interesting_places",
      "sport",
      "tourist_facilities",
    ];

  res.json(data);
});

// router.post("/:hotelId", async (req, res) => {
//   const { hotelId } = req.params;
//   const { filters } = req.body;
//   const data = await getDetails(hotelId, filters);

//   // Update weight to be set to 0.1 on accessing details of the hotel
//   await updateWeight(hotelId, data.cityId, req.user.id, 0.1, filters);

//   res.json(data);
// });

export default router;
