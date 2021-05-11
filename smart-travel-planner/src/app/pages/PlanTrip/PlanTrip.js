import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { FaMapMarkerAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

// Bootstrap
import { Form, FormGroup, Input, Button } from "reactstrap";

import {
  selectStart,
  selectDestination,
  selectStops,
  addStop,
  removeStop,
  setStops,
  setStart,
  setDestination,
} from "../../redux/features/Map";
import Map from "../../components/Map";

import "./PlanTrip.css";
import PlanTripInformation from "../../components/PlanTrip/PlanTripInformation";
import { getItinerary } from "../../requests/itineraries";

const PlanTrip = () => {
  useEffect(() => {
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      e.returnValue = "";
    });

    return () =>
      window.removeEventListener("beforeunload", (e) => {
        e.preventDefault();
        e.returnValue = "";
      });
  }, []);

  const start = useSelector(selectStart);
  const destination = useSelector(selectDestination);
  const stops = useSelector(selectStops);
  const params = useParams();

  const dispatch = useDispatch();
  const history = useHistory();
  const geocoderContainerRef = useRef();

  const [stop, updateStop] = useState("");
  const [selectedStop, updateSelectedStop] = useState(null);
  const [itinerary, setItinerary] = useState({
    name: "",
    route: [],
    hotels: [],
    POI: [],
  });

  useEffect(() => {
    if (!params.itineraryId) history.push("/home", { from: "Plan Trip" });

    (async () => {
      const response = await getItinerary(params.itineraryId);
      const itineraryInfo = response.data.itinerary;

      if (!itineraryInfo) {
        history.push("/home", { from: "Plan Trip" });
        return;
      }
      dispatch(setStart({ start: itineraryInfo.route[0] }));
      dispatch(
        setDestination({
          destination: itineraryInfo.route[itineraryInfo.route.length - 1],
        })
      );
      dispatch(
        setStops({
          stops: itineraryInfo.route.slice(1, itineraryInfo.route.length - 1),
        })
      );
      console.log(itineraryInfo);
      setItinerary({
        name: itineraryInfo.name,
        route: itineraryInfo.route,
        hotels: itineraryInfo.hotels,
        POI: itineraryInfo.POI,
      });
    })();
  }, []);

  const addToStops = async (e) => {
    e.preventDefault();

    if (!stop || stops.length >= 5) return;

    dispatch(addStop({ stop }));
    updateStop("");
  };

  useEffect(() => {
    setItinerary((itinerary) => ({
      ...itinerary,
      route: [start, ...stops, destination],
    }));
  }, [stops]);

  const removeFromStops = (index) => {
    const stopName = stops[index].name;
    dispatch(removeStop({ index }));
    setItinerary((itinerary) => ({
      ...itinerary,
      hotels: itinerary.hotels.filter((hotel) => hotel.stopName !== stopName),
      POI: itinerary.POI.filter((place) => place.stopName !== stopName),
    }));
  };

  return (
    <div className="plantrip">
      <div className="plantrip__map">
        <div className="plantrip__locations">
          <div className="plantrip__locations-controls">
            <Form onSubmit={addToStops}>
              <FormGroup className="plantrip__input-readonly">
                <Input
                  type="text"
                  value={start?.name || ""}
                  readOnly
                  onClick={() => updateSelectedStop(start)}
                  role="button"
                />
              </FormGroup>
              {stops && (
                <FormGroup className="plantrip__input">
                  {stops.map((stop, index) => (
                    <div key={index} className="plantrip__input-stops">
                      <Input
                        type="text"
                        value={stop?.name || ""}
                        readOnly
                        onClick={() => updateSelectedStop(stop)}
                        role="button"
                      />
                      <Button
                        color="danger"
                        size="md"
                        onClick={() => removeFromStops(index)}
                        className="rounded-pill px-3">
                        <IoClose size={20} />
                      </Button>
                    </div>
                  ))}
                </FormGroup>
              )}
              <FormGroup className="plantrip__geocoder">
                <div
                  className="plantrip__geocoder-container"
                  ref={geocoderContainerRef}></div>
                <Button
                  color="primary"
                  className="plantrip__btn-add"
                  title="Add stop">
                  <FaMapMarkerAlt /> Add location
                </Button>
              </FormGroup>

              <FormGroup className="plantrip__input-readonly">
                <Input
                  type="text"
                  value={destination?.name || ""}
                  readOnly
                  onClick={() => updateSelectedStop(destination)}
                  role="button"
                />
              </FormGroup>
            </Form>
          </div>
        </div>
        {start && destination && (
          <Map
            start={start}
            destination={destination}
            markers={stops}
            geocoderValue={stop}
            updateGeocoderValue={updateStop}
            geocoderContainerRef={geocoderContainerRef}
            selectedStop={selectedStop}
            updateSelectedStop={updateSelectedStop}
          />
        )}
      </div>
      <div className="plantrip__info">
        {start && destination && stops && (
          <PlanTripInformation
            stops={[start, ...stops, destination]}
            itinerary={itinerary}
            setItinerary={setItinerary}
          />
        )}
      </div>
    </div>
  );
};

export default PlanTrip;
