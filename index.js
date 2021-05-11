import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

import routeAPI from "./routes/api/route.js";
import hotelAPI from "./routes/api/hotels.js";
import placesAPI from "./routes/api/places.js";
import itineraries from "./routes/api/itineraries.js";
import auth from "./routes/users/auth.js";
import blogs from "./routes/blogs/blog.js";
import { checkForAuthentication } from "./routes/users/auth.middleware.js";

const app = express();
const port = process.env.PORT || 5000;

// Logging enabled in development
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  app.use(cors());
}

// MONGODB Configuration
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`Database connected`))
  .catch((err) => console.log(`Database connection error: ${err.message}`));

// Middleware
app.use(express.json());

// Routes
app.use("/users", auth);
app.use("/blogs", checkForAuthentication, blogs);
app.use("/itineraries", checkForAuthentication, itineraries);

app.use("/api/route", checkForAuthentication, routeAPI);
app.use("/api/hotels", checkForAuthentication, hotelAPI);
app.use("/api/places", checkForAuthentication, placesAPI);
app.use("*", (req, res) => res.status(404).send());

app.listen(port, () => console.log("Server listening..."));

// Watch for changes
const db = mongoose.connection;

db.once("open", () => {
  const blogCollection = db.collection("blogs");
  const changeStream = blogCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);
  });
});
