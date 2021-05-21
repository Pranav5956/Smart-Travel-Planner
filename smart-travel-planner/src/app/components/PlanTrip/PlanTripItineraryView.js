import {
  FaCalendar,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUser,
  FaUserAlt,
} from "react-icons/fa";
import { Badge, Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import moment from "moment";

const PlanTripItineraryView = ({ isOpen, toggle, itinerary, setItinerary }) => {
  console.log(itinerary);
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      fade
      unmountOnClose
      centered
      className="plantrip__itineraryModal"
      contentClassName="plantrip__itineraryContent">
      <ModalHeader className="bg-primary text-white" toggle={toggle}>
        <h4>{itinerary?.name}</h4>
      </ModalHeader>
      <ModalBody>
        <div className="plantrip__itinerary">
          {itinerary?.route.map((stop, index) => (
            <div
              className="plantrip__itinerary-stop"
              key={`itineraryStop-${index}`}>
              <h5 className="d-flex align-items-center">
                <FaMapMarkerAlt
                  className="mr-2"
                  color={
                    index === 0
                      ? "green"
                      : index === itinerary?.route.length - 1
                      ? "red"
                      : "orange"
                  }
                />
                {stop?.name}
              </h5>
              {index !== itinerary?.route.length - 1 && (
                <div className="plantrip__itinerary-stop--marker"></div>
              )}
              {itinerary?.hotels.filter((hotel) => hotel.stopName === stop.name)
                .length > 0 && (
                <div className="plantrip__itinerary-stop--hotels ml-5">
                  <h6>Hotels:</h6>
                  {itinerary?.hotels
                    .filter((hotel) => hotel.stopName === stop.name)
                    .map((hotel) => (
                      <div className="plantrip__itinerary-stop--hotel px-5 py-3 ml-3 mb-3">
                        <div className="plantrip__itinerary-thumbnail--cropper">
                          <img
                            src={
                              hotel.thumbnail ||
                              "https://static.wikia.nocookie.net/awakening-of-the-rebellion/images/c/c4/Missing_Image.jpg/revision/latest?cb=20200516103417"
                            }
                            {...(!hotel.thumbnail ? { alt: hotel.name } : {})}
                            width="250"
                            height="140"
                          />
                        </div>
                        <div className="plantrip__itinerary-info">
                          <h5 className="plantrip__itinerary-name">
                            {hotel.name}
                          </h5>
                          <p className="plantrip__itinerary-address text-muted">
                            {hotel.address}
                          </p>
                          <div className="plantrip__itinerary-hotelInfo">
                            <p className="d-flex align-items-center">
                              <FaCalendarAlt
                                style={{ color: "#007bff" }}
                                className="mr-2"
                                aria-hidden="true"
                                title="Check-In Date"
                              />
                              {moment
                                .unix(hotel.checkin_date)
                                .format("YYYY-MM-DD")}
                              <span className="mx-2">-</span>
                              <FaCalendarAlt
                                style={{ color: "#007bff" }}
                                className="mr-2"
                                aria-hidden="true"
                                title="Check-Out Date"
                              />
                              {moment
                                .unix(hotel.checkout_date)
                                .format("YYYY-MM-DD")}
                            </p>
                            <p className="d-flex align-items-center">
                              <FaUserAlt
                                style={{ color: "#007bff" }}
                                className="mr-2"
                                aria-hidden="true"
                                title="Adults Count"
                              />
                              {hotel.adults_number}
                            </p>
                          </div>
                          <Button
                            color="danger"
                            size="sm"
                            className="mt-1 mb-1 mr-auto"
                            onClick={() =>
                              // TODO: update weight on removing hotel from itinerary
                              setItinerary((itinerary) => ({
                                ...itinerary,
                                hotels: itinerary.hotels.filter(
                                  (h) => h.hotelId !== hotel.hotelId
                                ),
                              }))
                            }>
                            Remove from Itinerary
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
              {itinerary?.POI.filter((place) => place.stopName === stop.name)
                .length > 0 && (
                <div className="plantrip__itinerary-stop--places ml-5">
                  <h6>Places of Interest (POIs):</h6>
                  {itinerary?.POI.filter(
                    (place) => place.stopName === stop.name
                  ).map((place) => (
                    <div className="plantrip__itinerary-stop--place ml-3 mb-3 px-5 py-3">
                      <div className="plantrip__itinerary-thumbnail--cropper">
                        <img
                          src={
                            place.thumbnail ||
                            "https://static.wikia.nocookie.net/awakening-of-the-rebellion/images/c/c4/Missing_Image.jpg/revision/latest?cb=20200516103417"
                          }
                          {...(!place.thumbnail ? { alt: place.name } : {})}
                          width="250"
                          height="140"
                        />
                      </div>
                      <div className="plantrip__itinerary-info">
                        <h5 className="plantrip__itinerary-name">
                          {place.name}
                        </h5>
                        <div className="plantrip__itinerary-tags">
                          {place.kinds.split(",").map((tag, index) => (
                            <Badge
                              pill
                              className="mr-1"
                              color="primary"
                              key={`tag-${index}`}>
                              {tag.replace("_", " ")}
                            </Badge>
                          ))}
                        </div>
                        <Button
                          color="danger"
                          size="sm"
                          className="mt-3 mr-auto"
                          onClick={() =>
                            // TODO: update weight on removing place from itinerary
                            setItinerary((itinerary) => ({
                              ...itinerary,
                              POI: itinerary.POI.filter(
                                (p) => p.xid !== place.xid
                              ),
                            }))
                          }>
                          Remove from Itinerary
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ModalBody>
    </Modal>
  );
};

export default PlanTripItineraryView;
