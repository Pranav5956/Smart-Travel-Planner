import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import routeAPI from "./routes/api/route.js";

const app = express();
const port = process.env.PORT || 5000;

// Logging enabled in development
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  app.use(cors());
}

// Middleware
app.use(express.json());

// Routes
app.use("/api/route", routeAPI);

app.get("/", (req, res) => res.send("Hello World"));

app.listen(port, () => console.log("Server listening..."));
