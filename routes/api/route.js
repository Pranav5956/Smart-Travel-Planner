import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/optimize/:points", async (req, res) => {
  try {
    const points = req.params.points;

    if (!points)
      return res.status(400).json({
        id: "MissingPoints",
        message: "No points for the trip are provided!",
      });

    const optimizedRoute = await axios.get(
      `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${points}`,
      {
        params: {
          access_token: process.env.MAPBOX_API_ACCESS_TOKEN,
          overview: "full",
          steps: true,
          source: "first",
          destination: "last",
          geometries: "geojson",
          roundtrip: false,
        },
      }
    );

    const optimizedRouteData = optimizedRoute.data;

    if (optimizedRouteData.code === "NoRoute")
      return res.json({
        id: optimizedRouteData.code,
        message: optimizedRouteData.message,
      });

    res.json({
      id: optimizedRouteData.code,
      message: "Optimized route found!",
      route: optimizedRouteData,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});
export default router;
