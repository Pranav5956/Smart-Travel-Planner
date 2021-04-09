import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { FaMapMarkerAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

// Bootstrap
import { Form, FormGroup, Input, Button } from "reactstrap";

import { selectStart, selectDestination } from "../../redux/features/Map";
import Map from "../../components/Map";

import "./PlanTrip.css";
import PlanTripInformation from "../../components/PlanTripInformation";

const PlanTrip = () => {
  const start = useSelector(selectStart);
  const destination = useSelector(selectDestination);

  const history = useHistory();
  const geocoderContainerRef = useRef();

  const [stop, updateStop] = useState("");
  const [stops, updateStops] = useState([]);
  const [selectedStop, updateSelectedStop] = useState(null);

  if (!start || !destination) {
    history.push("/home", { from: "Plan Trip" });
    return null;
  }

  const addStop = async (e) => {
    e.preventDefault();

    if (!stop || stops.length >= 5) return;

    updateStops((stops) => [...stops, stop]);
    updateStop("");
  };

  const removeStop = (index) => {
    updateStops((stops) => [
      ...stops.slice(0, index),
      ...stops.slice(index + 1),
    ]);
  };

  return (
    <div className="plantrip">
      <div className="plantrip__locations">
        <div className="plantrip__locations-controls">
          <Form onSubmit={addStop}>
            <FormGroup className="plantrip__input-readonly">
              <Input
                type="text"
                value={start.name}
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
                      value={stop.name || ""}
                      readOnly
                      onClick={() => updateSelectedStop(stop)}
                      role="button"
                    />
                    <Button
                      color="danger"
                      size="md"
                      onClick={() => removeStop(index)}
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
                value={destination.name}
                readOnly
                onClick={() => updateSelectedStop(destination)}
                role="button"
              />
            </FormGroup>
          </Form>
        </div>
      </div>
      <div className="plantrip__map">
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
      </div>
      <div className="plantrip__info">
        <PlanTripInformation stops={[start, ...stops, destination]} />
      </div>
    </div>
  );
};

export default PlanTrip;
