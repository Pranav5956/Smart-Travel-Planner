import express from "express";
import { getOptimizedRoute } from "../../api/route.js";

const router = express.Router();

router.get("/optimize/:points", async (req, res) => {
  try {
    const points = req.params.points;

    if (!points)
      return res.status(400).json({
        id: "MissingPoints",
        message: "No points for the trip are provided!",
      });

    const response = await getOptimizedRoute(points);
    const data = response.data;

    if (data.code === "NoRoute")
      return res.json({
        id: data.code,
        message: data.message,
      });

    res.json({
      id: data.code,
      message: "Optimized route found!",
      route: data,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});
export default router;
