import React, {
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
} from "react";

import MapGL, {
  GeolocateControl,
  NavigationControl,
  Marker,
  Source,
  Layer,
} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import * as turf from "@turf/turf";

import { FaMapMarkerAlt } from "react-icons/fa";

import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

import axios from "axios";

const routeLayerStyle = {
  id: "routeLayer",
  type: "line",
  source: "route",
  paint: {
    "line-color": "blue",
    "line-width": 2,
  },
};

const routeDirectionStyle = {
  id: "routearrows",
  type: "symbol",
  source: "route",
  layout: {
    "symbol-placement": "line",
    "text-field": "▶",
    "text-size": ["interpolate", ["linear"], ["zoom"], 12, 24, 22, 60],
    "symbol-spacing": ["interpolate", ["linear"], ["zoom"], 12, 30, 22, 160],
    "text-keep-upright": false,
  },
  paint: {
    "text-color": "blue",
    "text-halo-color": "hsl(55, 11%, 96%)",
    "text-halo-width": 3,
  },
};

const Map = ({
  start,
  destination,
  markers,
  geocoderContainerRef,
  geocoderValue,
  updateGeocoderValue,
  ...mapProps
}) => {
  const [viewport, setViewport] = useState({
    latitude: (start.coordinates[1] + destination.coordinates[1]) / 2,
    longitude: (start.coordinates[0] + destination.coordinates[0]) / 2,
    zoom: 5,
  });
  const [routeGeoJSON, setRouteGeoJSON] = useState(turf.featureCollection([]));

  useEffect(() => {
    const routePoints = [start, ...markers, destination].map(
      (point) => point.coordinates
    );
    const formattedRoutePoints = routePoints
      .map((point) => `${point[0]},${point[1]}`)
      .join(";");

    const getOptimizedRoute = async () => {
      const optimizedRoute = await axios.get(
        `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${formattedRoutePoints}?overview=full&steps=true&source=first&destination=last&geometries=geojson&roundtrip=false&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
      );

      if (optimizedRoute.data.trips && optimizedRoute.data.trips.length)
        setRouteGeoJSON(
          turf.featureCollection(
            turf.feature(optimizedRoute.data.trips[0].geometry)
          )
        );
      else {
        alert("No route found!");
        setRouteGeoJSON(turf.featureCollection([]));
      }
    };

    getOptimizedRoute();
  }, [markers]);

  const mapRef = useRef();

  const handleViewportChange = useCallback(
    (updatedViewport) =>
      setViewport((viewport) => ({
        ...viewport,
        ...updatedViewport,
        transitionDuration: 250,
      })),
    []
  );
  const handleGeocoderResult = useCallback(
    (e) => {
      updateGeocoderValue({
        name: e.result.place_name,
        coordinates: e.result.geometry.coordinates,
      });
    },
    [updateGeocoderValue]
  );

  const markerSize = 50;
  const props = {
    map: {
      ...viewport,
      width: "100%",
      height: "100%",
      ref: mapRef,
      mapStyle: "mapbox://styles/mapbox/dark-v10",
      mapboxApiAccessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
      onViewportChange: handleViewportChange,
      ...mapProps,
    },
    geolocateControl: {
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
      style: { padding: "4.5rem 1rem" },
    },
    navigationControl: {
      style: {
        right: 0,
        top: 0,
        padding: "4.5rem 2rem",
      },
      zoomInLabel: "Zoom In",
      zoomOutLabel: "Zoom Out",
    },
    geocoder: {
      mapRef: mapRef,
      containerRef: geocoderContainerRef,
      onViewportChange: handleViewportChange,
      mapboxApiAccessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
      placeholder: "Enter an address",
      clearOnBlur: true,
      limit: 8,
      marker: false,
      inputValue: geocoderValue?.name,
      trackProximity: true,
      onResult: handleGeocoderResult,
      onClear: () => updateGeocoderValue(""),
    },
    marker: {
      offsetLeft: -markerSize / 2,
      offsetTop: -markerSize,
    },
  };

  const Markers = useMemo(
    () =>
      markers.map((marker, index) => (
        <Marker
          longitude={marker.coordinates[0]}
          latitude={marker.coordinates[1]}
          key={index}
          {...props.marker}>
          <FaMapMarkerAlt color="orange" size={markerSize} />
        </Marker>
      )),
    [props.marker, markers]
  );

  return (
    <MapGL {...props.map}>
      <GeolocateControl {...props.geolocateControl} />
      <NavigationControl {...props.navigationControl} />
      <Geocoder {...props.geocoder} />
      <Marker
        longitude={start.coordinates[0]}
        latitude={start.coordinates[1]}
        {...props.marker}>
        <FaMapMarkerAlt color="green" size={markerSize} />
      </Marker>
      <Marker
        longitude={destination.coordinates[0]}
        latitude={destination.coordinates[1]}
        {...props.marker}>
        <FaMapMarkerAlt color="red" size={markerSize} />
      </Marker>
      {Markers}
      <Source id="route" type="geojson" data={routeGeoJSON.features}>
        <Layer {...routeLayerStyle} />
        <Layer {...routeDirectionStyle} />
      </Source>
    </MapGL>
  );
};

export default Map;
