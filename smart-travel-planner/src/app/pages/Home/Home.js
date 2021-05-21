import React, { useState, useRef, useCallback } from "react";
import { useHistory } from "react-router-dom";

import MapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

import "./Home.css";
import { Button, Jumbotron } from "reactstrap";
import { initializeItinerary } from "../../requests/itineraries.js";
import {
  FaFacebook,
  FaGithub,
  FaGithubAlt,
  FaInstagram,
  FaInstagramSquare,
  FaLinkedin,
} from "react-icons/fa";

const Home = () => {
  const [start, updateStart] = useState({ name: "", coordinates: [] });
  const [destination, updateDestination] = useState({
    name: "",
    coordinates: [],
  });

  const history = useHistory();

  const mapRef = useRef();
  const geocoderStartContainerRef = useRef();
  const geocoderDestinationContainerRef = useRef();

  const onPlanTrip = useCallback(
    async (e) => {
      e.preventDefault();

      if (!start.coordinates.length || !destination.coordinates.length) return;

      const response = await initializeItinerary([start, destination]);
      const itineraryId = response.data.itinerary._id;

      history.push(`/plantrip/${itineraryId}`, { from: "Home" });
    },
    [start, destination, history]
  );

  const onGeocoderStartClear = useCallback(
    () => updateStart({ name: "", coordinates: [] }),
    [updateStart]
  );
  const onGeocoderDestinationClear = useCallback(
    () => updateDestination({ name: "", coordinates: [] }),
    [updateDestination]
  );
  const onGeocoderStartResult = useCallback(
    (e) =>
      updateStart({
        name: e.result.place_name,
        coordinates: e.result.geometry.coordinates,
      }),
    [updateStart]
  );
  const onGeocoderDestinationResult = useCallback(
    (e) =>
      updateDestination({
        name: e.result.place_name,
        coordinates: e.result.geometry.coordinates,
      }),
    [updateDestination]
  );

  return (
    <div className="home">
      <Jumbotron className="home__trip-plannerContainer">
        <div className="home__trip-planner">
          <h1 className="display-3 pl-5">Trip Planner</h1>
          <p className="lead px-5">
            Welcome to our Smart Trip Planner. Explore interesting places, book
            hotels and plan trips with ease!
          </p>

          <p className="lead mb-0 mt-3 pl-5">Plan your next trip</p>
          <div className="home__trip-planner--form ml-5">
            <div
              className="geocoderContainer"
              ref={geocoderStartContainerRef}></div>
            <div
              className="geocoderContainer"
              ref={geocoderDestinationContainerRef}></div>
            <Button
              color="primary"
              onClick={onPlanTrip}
              className="rounded-pill px-4 mx-3">
              Plan Trip
            </Button>
          </div>

          <MapGL
            ref={mapRef}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            width="100%"
            height="0"
            style={{ position: "absolute", visibility: "hidden" }}>
            <Geocoder
              mapRef={mapRef}
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
              containerRef={geocoderStartContainerRef}
              placeholder="Enter start address"
              inputValue={start.name}
              onResult={onGeocoderStartResult}
              onClear={onGeocoderStartClear}
            />
            <Geocoder
              mapRef={mapRef}
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
              containerRef={geocoderDestinationContainerRef}
              placeholder="Enter destination address"
              inputValue={destination.name}
              onResult={onGeocoderDestinationResult}
              onClear={onGeocoderDestinationClear}
            />
          </MapGL>
        </div>
      </Jumbotron>
      <div className="home__icons mt-auto p-3 ml-auto">
        <a href="" aria-hidden="true">
          <FaInstagram />
        </a>
        <a
          href="https://github.com/Pranav5956/Smart-Travel-Planner"
          aria-hidden="true">
          <FaGithub />
        </a>
        <a href="" aria-hidden="true">
          <FaFacebook />
        </a>
        <a href="" aria-hidden="true">
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
};

export default Home;
