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
  FlyToInterpolator,
} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import * as turf from "@turf/turf";

import { FaMapMarkerAlt } from "react-icons/fa";

import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

import axios from "../axios";
import { useSelector } from "react-redux";
import { selectTheme } from "../redux/features/Theme";

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
  selectedStop,
  updateSelectedStop,
  ...mapProps
}) => {
  const theme = useSelector(selectTheme);
  const [viewport, setViewport] = useState({
    latitude: (start.coordinates[1] + destination.coordinates[1]) / 2,
    longitude: (start.coordinates[0] + destination.coordinates[0]) / 2,
    zoom: 5,
  });

  const flyToLocation = (latitude, longitude) => {
    setViewport((viewport) => ({
      ...viewport,
      latitude,
      longitude,
      zoom: 14,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
    }));
  };

  const [routeGeoJSON, setRouteGeoJSON] = useState(null);

  useEffect(() => {
    const getOptimizedRoute = async () => {
      const points = [start, ...markers, destination]
        .map((point) => point.coordinates.join(","))
        .join(";");

      const response = await axios.get(`/api/route/optimize/${points}`, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      const data = response.data;

      if (data.id === "Ok")
        setRouteGeoJSON(
          turf.featureCollection(turf.feature(data.route.trips[0].geometry))
        );
      else {
        setRouteGeoJSON(null);
      }
    };

    getOptimizedRoute();
  }, [start, destination, markers]);

  useEffect(() => {
    if (!selectedStop) return;

    const [longitude, latitude] = selectedStop.coordinates;
    flyToLocation(latitude, longitude);
    updateSelectedStop(null);
  }, [selectedStop, updateSelectedStop]);

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
      mapStyle: `mapbox://styles/mapbox/${
        theme === "dark" ? "dark-v10" : "streets-v11"
      }`,
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
          {...props.marker}
          onClick={() => updateSelectedStop(marker)}>
          <FaMapMarkerAlt color="orange" size={markerSize} />
        </Marker>
      )),
    [props.marker, markers, updateSelectedStop]
  );

  return (
    <MapGL {...props.map}>
      <GeolocateControl {...props.geolocateControl} />
      <NavigationControl {...props.navigationControl} />
      <Geocoder {...props.geocoder} />
      <Marker
        longitude={start.coordinates[0]}
        latitude={start.coordinates[1]}
        {...props.marker}
        onClick={() => updateSelectedStop(start)}>
        <FaMapMarkerAlt color="green" size={markerSize} />
      </Marker>
      <Marker
        longitude={destination.coordinates[0]}
        latitude={destination.coordinates[1]}
        {...props.marker}
        onClick={() => updateSelectedStop(destination)}>
        <FaMapMarkerAlt color="red" size={markerSize} />
      </Marker>
      {Markers}
      {routeGeoJSON && (
        <Source id="route" type="geojson" data={routeGeoJSON.features}>
          <Layer {...routeLayerStyle} />
          <Layer {...routeDirectionStyle} />
        </Source>
      )}
    </MapGL>
  );
};

export default Map;
