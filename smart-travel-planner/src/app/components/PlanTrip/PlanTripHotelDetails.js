import React, { useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Collapse,
  Modal,
  ModalBody,
  ModalHeader,
  UncontrolledCarousel,
} from "reactstrap";
import moment from "moment";
import axios from "../../axios";
import { updateItineraryWeights } from "../../requests/itineraries";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { hotelDetail } from "../../data/QueryOptions";
import ReactStarRatingComponent from "react-star-rating-component";

import SwiperCore, { EffectCoverflow } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/effect-coverflow/effect-coverflow.scss";
import { useParams } from "react-router";
SwiperCore.use([EffectCoverflow]);

const PlanTripHotelDetails = ({
  stopName,
  isOpen,
  toggle,
  hotelId,
  filters,
  unsetHotelDetails,
  setItinerary,
  itinerary,
  thumbnail,
}) => {
  const [details, setDetails] = useState(null);
  const [activeAccordianTab, setActiveAccordianTab] = useState({
    amenityIndex: 0,
    subIndex: 0,
  });
  const params = useParams();

  const getHotelDetails = async () => {
    setDetails(null);
    const response = await axios.post(
      `/api/hotels/${hotelId}`,
      { filters },
      { headers: { "x-auth-token": localStorage.getItem("token") } }
    );
    const details = response.data;
    if (details.message) return setDetails(null);
    setDetails(details);
    // setDetails(hotelDetail);
  };

  const addToItinerary = async () => {
    setItinerary((itinerary) => ({
      ...itinerary,
      hotels: [
        ...itinerary.hotels,
        {
          name: details.name,
          thumbnail,
          hotelId,
          cityId: details.cityId,
          address: details.address,
          filters,
          checkin_date: moment(filters.checkin_date).unix(),
          checkout_date: moment(filters.checkout_date).unix(),
          adults_number: filters.adults_number,
          stopName,
        },
      ],
    }));
    const weights = {
      added: {
        hotels: [{ hotelId: details.hotelId, cityId: details.cityId, filters }],
        POI: [],
      },
      removed: { hotels: [], POI: [] },
      saveType: "soft",
    };
    await updateItineraryWeights(params.itineraryId, weights);
  };

  const removeFromItinerary = async () => {
    setItinerary((itinerary) => ({
      ...itinerary,
      hotels: itinerary.hotels.filter((hotel) => hotel.hotelId !== hotelId),
    }));
    const weights = {
      removed: {
        hotels: [{ hotelId: details.hotelId, cityId: details.cityId, filters }],
        POI: [],
      },
      added: { hotels: [], POI: [] },
      saveType: "soft",
    };
    await updateItineraryWeights(params.itineraryId, weights);
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
                    {itinerary.hotels.filter(
                      (hotel) => hotel.hotelId === hotelId
                    ).length > 0 ? (
                      <Button
                        color="danger"
                        size="sm"
                        onClick={removeFromItinerary}>
                        Remove from Iterinary
                      </Button>
                    ) : (
                      <Button
                        color="success"
                        size="sm"
                        onClick={addToItinerary}>
                        Add to Iterinary
                      </Button>
                    )}
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
              <div className="plantrip__details-amenities">
                {details.amenities.length &&
                  details.amenities.map(
                    ({ heading, listItems }, amenityIndex) => (
                      <div
                        className="plantrip__details-amenity"
                        key={`amenity-${amenityIndex}`}>
                        <h4 className="plantrip__details-pageSubheaders">
                          {heading}
                        </h4>
                        {listItems.length &&
                          listItems.map(({ heading, listItems }, index) => (
                            <Card
                              className="mb-1 plantrip__details-amenityItems"
                              key={`amenity-item-${index}`}>
                              <CardHeader
                                onClick={() =>
                                  setActiveAccordianTab({
                                    amenityIndex: amenityIndex + 1,
                                    subIndex: index + 1,
                                  })
                                }>
                                {heading}
                              </CardHeader>
                              <Collapse
                                isOpen={
                                  activeAccordianTab.amenityIndex ===
                                    amenityIndex + 1 &&
                                  activeAccordianTab.subIndex === index + 1
                                }>
                                <p className="text-muted">
                                  {listItems.length &&
                                    listItems.slice(0, 6).join(" ● ")}
                                </p>
                              </Collapse>
                            </Card>
                          ))}
                      </div>
                    )
                  )}
              </div>
              {activeAccordianTab.amenityIndex === 0 &&
                activeAccordianTab.subIndex === 0 && (
                  <p className="text-center text-primary mt-3 font-weight-bold">
                    Click on any tab for more info.
                  </p>
                )}
            </div>
            <div className="plantrip__details-page">
              <div className="plantrip__details-specialFeatures">
                <h4 className="text-uppercase text-center plantrip__details-pageSubheaders">
                  Special Features
                </h4>
                {details.specialFeatures.sections.length &&
                  details.specialFeatures.sections.map(
                    ({ heading, freeText }, index) => (
                      <Card key={`special-feature-${index}`} className="mt-3">
                        <CardHeader>{heading}</CardHeader>
                        <CardBody>
                          <p
                            className="text-center"
                            dangerouslySetInnerHTML={{ __html: freeText }}></p>
                        </CardBody>
                      </Card>
                    )
                  )}
              </div>
            </div>
            <div className="plantrip__details-page">
              <h4 className="text-uppercase text-center mb-5 plantrip__details-pageSubheaders">
                Reviews
              </h4>
              <div className="mx-2">
                <Swiper
                  effect="coverflow"
                  centeredSlides
                  slidesPerView="auto"
                  coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 500,
                    modifier: 1,
                    slideShadows: false,
                  }}>
                  {details.reviews.reviews.length &&
                    details.reviews.reviews
                      .slice(0, 4)
                      .map(
                        (
                          {
                            recommendedBy,
                            qualitativeBadgeText,
                            postedOn,
                            title,
                            summary,
                            rating,
                          },
                          index
                        ) => (
                          <SwiperSlide>
                            <Card
                              key={`review-${index}`}
                              className="plantrip__details-review">
                              {/* <CardImg
                                className="plantrip__details-reviewImage"
                                src="https://static.thenounproject.com/png/642902-200.png"
                                alt="Avatar"
                              /> */}
                              <div className="plantrip__details-reviewInfo">
                                <div className="plantrip__details-reviewHeader">
                                  <h5>{recommendedBy || "Anonymous"}</h5>
                                  <Badge
                                    color="danger"
                                    className="ml-2 mb-2 text-uppercase p-1">
                                    {qualitativeBadgeText}
                                  </Badge>
                                </div>
                                <p className="text-center mb-2">
                                  <i>
                                    {moment
                                      .unix(postedOn / 1000)
                                      .format("on ddd, Do MMMM, YYYY")}
                                  </i>
                                </p>
                                <div className="plantrip__details-reviewstars">
                                  <ReactStarRatingComponent
                                    editing={false}
                                    starCount={10}
                                    value={rating}
                                    aria-label={`${rating}/10 stars`}
                                  />
                                </div>
                                <div className="plantrip__Details-reviewbody">
                                  <h6 className="text-center mt-2">
                                    {title || "Review"}
                                  </h6>
                                  <div className="plantrip__Details-reviewsummary">
                                    <p className="text-center mt-2">
                                      {summary}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </SwiperSlide>
                        )
                      )}
                </Swiper>
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
