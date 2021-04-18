import axios from "axios";

export const getOptimizedRoute = (points) => {
  return axios.get(
    `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${points}`,
    {
      params: {
        access_token: process.env.MAPBOX_API_ACCESS_TOKEN,
        overview: "full",
        // steps: true,
        source: "first",
        destination: "last",
        geometries: "geojson",
        roundtrip: false,
      },
    }
  );
};
