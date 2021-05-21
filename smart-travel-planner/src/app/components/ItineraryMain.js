import moment from "moment";
import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaInfo,
  FaMapMarkerAlt,
  FaUserAlt,
} from "react-icons/fa";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  Badge,
  Button,
  Jumbotron,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { getItinerary, removeItinerary } from "../requests/itineraries";

const ItineraryMain = ({ setActiveItinerary }) => {
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const response = await getItinerary(params.itineraryId);
      const selectedItinerary = response.data.itinerary;

      setItinerary(selectedItinerary);
      setActiveItinerary(params.itineraryId);
    })();
  }, [params.itineraryId]);

  const [itinerary, setItinerary] = useState(null);
  const [deleteItinerary, setDeleteItinerary] = useState(false);

  const toggleDeleteItineraryModal = () => {
    setDeleteItinerary((deleteItinerary) => !deleteItinerary);
  };

  return (
    <div className="itinerary__main-itinerary">
      {itinerary ? (
        <>
          <Modal
            isOpen={deleteItinerary}
            toggle={toggleDeleteItineraryModal}
            fade
            centered
            unmountOnClose
            contentClassName="itinerary__main-itinerarymodal--content">
            <ModalHeader
              toggle={toggleDeleteItineraryModal}
              className="bg-primary text-white">
              <h4>Confirm Delete Itinerary</h4>
            </ModalHeader>
            <ModalBody className="d-flex flex-column align-items-center justify-content-center">
              <h5>Are you sure you want to delete "{itinerary.name}"?</h5>
              <div className="d-flex align-items-center justify-content-center mt-3">
                <Button
                  color="danger"
                  className="mr-3 px-4"
                  onClick={async () => {
                    await removeItinerary(itinerary._id);
                    window.location.assign("/itineraries");
                  }}>
                  DELETE
                </Button>
                <Button
                  color="secondary"
                  className="px-4"
                  onClick={toggleDeleteItineraryModal}>
                  RETURN
                </Button>
              </div>
              <span
                className="text-danger mt-4"
                style={{ fontSize: "0.85rem" }}>
                Deleting an itinerary is an irreversible action! Please proceed
                at your own discretion.
              </span>
            </ModalBody>
          </Modal>
          <div className="itinerary__main-itinerary--info">
            <h4 className="itinerary__main-itineraryName">{itinerary.name}</h4>
            <div className="itinerary__main-itineraryExtras">
              <div className="itinerary__main-itineraryTimestamps">
                <p className="itinerary__main-createdAt">
                  Created on
                  {moment(itinerary.createdAt).format(
                    " MMMM Do, YYYY HH:mm:ss A"
                  )}
                </p>
                <p className="itinerary__main-updatedAt">
                  Last updated on
                  {moment(itinerary.updatedAt).format(
                    " MMMM Do, YYYY HH:mm:ss A"
                  )}
                </p>
              </div>
              <div className="itinerary__main-itineraryButtons">
                <Link
                  color="primary"
                  className="mr-3 btn btn-primary"
                  to={`/plantrip/${params.itineraryId}`}>
                  Edit Itinerary
                </Link>
                <Button color="danger" onClick={toggleDeleteItineraryModal}>
                  Delete Itinerary
                </Button>
              </div>
            </div>
          </div>

          <div className="itinerary__main-stops">
            {itinerary.route.map((stop, index) => (
              <div className="itinerary__main-stop" key={stop._id}>
                <h5 className="itinerary__main-stop--name">
                  <FaMapMarkerAlt
                    className="mr-2"
                    color={
                      index === 0
                        ? "green"
                        : index === itinerary.route.length - 1
                        ? "red"
                        : "orange"
                    }
                  />
                  {stop.name}
                </h5>
                {index !== itinerary?.route.length - 1 && (
                  <div className="itinerary__main-stopMarker"></div>
                )}
                <div className="itinerary__main-hotels">
                  {itinerary.hotels.filter(
                    (hotel) => hotel.stopName === stop.name
                  ).length > 0 &&
                    itinerary.hotels
                      .filter((hotel) => hotel.stopName === stop.name)
                      .map((hotel, index) => (
                        <div
                          className="itinerary__main-hotel ml-5"
                          key={`hotel-${index}`}>
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
                          <div className="itinerary__main-info">
                            <h6 className="itinerary__main-name">
                              {hotel.name}
                            </h6>
                            <p className="itinerary__main-address text-muted">
                              {hotel.address}
                            </p>
                            <div className="itinerary__main-hotelInfo">
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
                          </div>
                        </div>
                      ))}
                </div>
                <div className="itinerary__main-places ml-5">
                  {itinerary.POI.filter((poi) => poi.stopName === stop.name)
                    .length > 0 &&
                    itinerary.POI.filter(
                      (poi) => poi.stopName === stop.name
                    ).map((place, index) => (
                      <div
                        className="itinerary__main-place"
                        key={`place-${index}`}>
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
                        <div className="itinerary__main-info">
                          <h6 className="itinerary__main-name">{place.name}</h6>
                          <div className="itinerary__main-tags">
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
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Itinerary does not exist</p>
      )}
    </div>
  );
};

export default ItineraryMain;
