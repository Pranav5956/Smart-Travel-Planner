import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  UncontrolledCarousel,
} from "reactstrap";
import axios from "../../axios";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { FaPlus } from "react-icons/fa";

const PlanTripHotelDetails = ({
  isOpen,
  toggle,
  hotelId,
  filters,
  unsetHotelDetails,
}) => {
  const [details, setDetails] = useState(null);

  const getHotelDetails = async () => {
    setDetails(null);
    const response = await axios.post(
      `/api/hotels/${hotelId}`,
      { filters },
      { headers: { "x-auth-token": localStorage.getItem("token") } }
    );
    const details = response.data;
    if (details.message) return setDetails(null);
    console.log(details);
    setDetails(details);
  };

  return (
    <Modal
      scrollable
      isOpen={isOpen}
      toggle={toggle}
      centered
      contentClassName="plantrip__details-modal"
      onEnter={getHotelDetails}
      onClosed={unsetHotelDetails}
      unmountOnClose>
      <ModalHeader className="bg-primary text-white" toggle={toggle}>
        HOTEL DETAILS
      </ModalHeader>
      <ModalBody>
        {details ? (
          <div className="plantrip__details-pages">
            <div className="plantrip__details-page">
              <div className="plantrip__details-carousel">
                <UncontrolledCarousel
                  items={details.photos.map((photo, index) => ({
                    src: photo,
                    alt: `${details.name} - Photo ${index}`,
                    key: index,
                    captionText: "",
                  }))}
                />
              </div>
              <div className="plantrip__details-details">
                <div className="plantrip__details-info">
                  <h4 className="plantrip__details-name">{details.name}</h4>
                  <p className="plantrip__details-address text-muted mb-3">
                    {details.address}
                  </p>
                  <div className="plantrip__details-iterinary mt-1">
                    <Button color="success" size="sm">
                      Add to Iterinary
                    </Button>
                    <Button
                      color="secondary"
                      size="sm"
                      className="ml-3"
                      onClick={toggle}>
                      Go back to viewing Hotels
                    </Button>
                  </div>
                </div>
                <div className="plantrip__details-attributes">
                  <blockquote className="plantrip__details-tagline">
                    <p>
                      <i>{details.tagline[0].replace(/<[^>]+>/g, "")}</i>
                    </p>
                  </blockquote>
                  <div className="plantrip__details-ratings">
                    <div className="plantrip__details-rating">
                      <p className="text-muted">Star Rating</p>
                      <h6>{details.stars}</h6>
                    </div>
                    <div className="plantrip__details-rating">
                      <p className="text-muted">Guest Rating</p>
                      <h6>{details.avgGuestReviews}</h6>
                    </div>
                    <div className="plantrip__details-rating">
                      <p className="text-muted">Featured Price</p>
                      <h6>
                        <span>{details.featuredPrice[0]}</span>
                        {details.featuredPrice.slice(1)}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="plantrip__details-page">
              <div className="plantrip__details-carousel">
                <UncontrolledCarousel
                  items={details.photos.map((photo, index) => ({
                    src: photo,
                    alt: `${details.name} - Photo ${index}`,
                    key: index,
                    captionText: "",
                  }))}
                />
              </div>
              <div className="plantrip__details-details">
                <div className="plantrip__details-info">
                  <h4 className="plantrip__details-name">{details.name}</h4>
                  <p className="plantrip__details-address text-muted mb-3">
                    {details.address}
                  </p>
                  <div className="plantrip__details-iterinary mt-1">
                    <Button color="success" size="sm">
                      Add to Iterinary
                    </Button>
                    <Button
                      color="secondary"
                      size="sm"
                      className="ml-3"
                      onClick={toggle}>
                      Go back to viewing Hotels
                    </Button>
                  </div>
                </div>
                <div className="plantrip__details-attributes">
                  <blockquote className="plantrip__details-tagline">
                    <p>
                      <i>{details.tagline[0].replace(/<[^>]+>/g, "")}</i>
                    </p>
                  </blockquote>
                  <div className="plantrip__details-ratings">
                    <div className="plantrip__details-rating">
                      <p className="text-muted">Star Rating</p>
                      <h6>{details.stars}</h6>
                    </div>
                    <div className="plantrip__details-rating">
                      <p className="text-muted">Guest Rating</p>
                      <h6>{details.avgGuestReviews}</h6>
                    </div>
                    <div className="plantrip__details-rating">
                      <p className="text-muted">Featured Price</p>
                      <h6>
                        <span>{details.featuredPrice[0]}</span>
                        {details.featuredPrice.slice(1)}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="plantrip__info-hotels--loader">
            <Loader
              type="ThreeDots"
              color="#007BFF"
              height={100}
              width={100}
              className="loader-icon"
            />
            <p>Getting details of hotel...</p>
          </div>
        )}
      </ModalBody>
    </Modal>
  );
};

export default PlanTripHotelDetails;
