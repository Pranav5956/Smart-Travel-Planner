import clsx from "clsx";
import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  ListGroupItemText,
  Modal,
  ModalBody,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import moment from "moment";
import Select from "react-select";
import Slider from "../Slider";
import PlanTripHotelOverview from "./PlanTripHotelOverview";
import PlanTripPlacesOverview from "./PlanTripPlacesOverview";
import axios from "../../axios";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import DropdownTreeSelect from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";

// import { overview } from "../../references/addHotels";

import {
  sortOptions,
  starRatingOptions,
  amenitiesOptions,
  themesOptions,
  poiFilterOptions,
} from "../../data/QueryOptions";
import PlanTripHotelDetails from "./PlanTripHotelDetails";

const getFormattedDate = (translate = 0) => {
  return moment().add(translate, "days").format("YYYY-MM-DD");
};

const formatFilters = (filters) => {
  const star_rating_ids = filters.star_rating_ids
    .map((rating) => rating.value)
    .join(",");
  const amenity_ids = filters.amenity_ids
    .map((amenity) => amenity.value)
    .join(",");
  const theme_ids = filters.theme_ids.map((theme) => theme.value).join(",");

  const formattedFilters = {
    checkin_date: filters.checkin_date,
    checkout_date: filters.checkout_date,
    adults_number: filters.adults_number.toString(),
    sort_order: filters.sort_order.value,
    price_max: (filters.price_max * 100).toString(),
    price_min: (filters.price_min === 0 ? 1 : filters.price_min).toString(),
    guest_rating_min: filters.guest_rating_min.toString(),
    ...(star_rating_ids && { star_rating_ids }),
    ...(amenity_ids && { amenity_ids }),
    ...(theme_ids && { theme_ids }),
  };

  return formattedFilters;
};

// const getLeafNodes = (nodes) => {
//   let leafNodes = [];

//   while (nodes.length > 0) {
//     if (nodes[0].hasOwnProperty("_children")) {
//       nodes[0]._children.forEach((child) => nodes.push(child));
//       nodes.shift();
//     } else {
//       leafNodes.push(nodes.shift());
//     }
//   }

//   return leafNodes;
// };

const customSelectStyle = {
  multiValue: (provided, state) => ({
    ...provided,
    backgroundColor: "#007bff",
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    color: "#ffffff",
    paddingLeft: "0.5rem",
    paddingRight: "0.3rem",
  }),
  multiValueRemove: (provided, state) => ({
    ...provided,
    color: "#ffffff",
  }),
};

const PlanTripInformation = ({ stops }) => {
  const [selectedStop, setSelectedStop] = useState(stops.length - 1);
  const [selectedHotel, setSelectedHotel] = useState({
    hotelId: null,
    isOpen: false,
  });
  const [activeTab, updateActiveTab] = useState("1");

  const [hotelInfo, setHotelInfo] = useState({
    message: "",
    hotels: [],
    queried: false,
  });
  const [placesInfo, setPlacesInfo] = useState({
    message: "",
    places: [],
    queried: false,
  });
  const [placesCategories, setPlacesCategories] = useState({
    message: "",
    categories: [],
    selectedCategories: {},
    isOpen: false,
    queried: false,
  });

  const [filterQueries, updateFilterQueries] = useState({
    checkin_date: getFormattedDate(),
    checkout_date: getFormattedDate(1),
    adults_number: 1,
    sort_order: sortOptions[0],
    price_min: 0,
    price_max: 10,
    guest_rating_min: 1,
    star_rating_ids: starRatingOptions,
    amenity_ids: [],
    theme_ids: [],
  });
  const [poiQueries, updatePoiQueries] = useState({
    radius: 20000,
    categories: "",
    query: "",
  });

  useEffect(() => {
    setSelectedStop(stops.length - 1);
  }, [stops, setSelectedStop]);

  useEffect(() => {
    formatFilters(filterQueries);
  }, [filterQueries]);

  const setQuery = (query, value) => {
    updateFilterQueries({ ...filterQueries, [query]: value });
  };

  const setActiveTab = (tab) => updateActiveTab(tab);

  const getHotels = async (isRecommend = false) => {
    setHotelInfo({
      message: isRecommend
        ? `Fetching Hotel Recommendations for "${stops[selectedStop].name}"`
        : `Fetching Information about Hotels in "${stops[selectedStop].name}"`,
      hotels: [],
      queried: false,
    });
    const response = await axios.post(
      `/api/hotels${isRecommend ? "/recommend" : ""}`,
      {
        city: stops[selectedStop].name,
        filters: formatFilters(filterQueries),
      },
      {
        headers: { "x-auth-token": localStorage.getItem("token") },
      }
    );
    const hotels = response.data;
    setHotelInfo({ message: "", hotels, queried: true });
  };

  const getPlaces = async (categories) => {
    setPlacesInfo({
      message: `Looking for places in "${stops[selectedStop].name}"`,
      places: [],
      queried: false,
    });
    const response = await axios.post(
      "/api/places",
      {
        city: stops[selectedStop].name.split(", ")[0],
        radius: poiQueries.radius,
        categories: categories || poiQueries.categories,
        query: poiQueries.query,
      },
      {
        headers: { "x-auth-token": localStorage.getItem("token") },
      }
    );
    const places = response.data;
    setPlacesInfo({ message: "", places, queried: true });
  };

  const closePlacesRecommendation = () => {
    setPlacesCategories((placesCategories) => ({
      ...placesCategories,
      isOpen: false,
      queried: false,
      categories: [],
    }));
  };

  const getPlacesRecommendation = async () => {
    setPlacesCategories({
      message: "Searching for recommended categories...",
      categories: [],
      selectedCategories: {},
      isOpen: true,
      queried: false,
    });
    const response = await axios.post(
      "/api/places/recommend",
      {},
      {
        headers: { "x-auth-token": localStorage.getItem("token") },
      }
    );
    const categories = response.data;
    setPlacesCategories((placesCategories) => ({
      ...placesCategories,
      message: "",
      categories,
      selectedCategories: categories.reduce(
        (dict, cat) => ({ ...dict, [cat]: false }),
        {}
      ),
      queried: true,
    }));
  };

  useEffect(() => {
    getHotels();
    getPlaces();
  }, [selectedStop]);

  const closeHotelModal = () =>
    setSelectedHotel((selectedHotel) => ({ ...selectedHotel, isOpen: false }));
  const unsetHotelDetails = () =>
    setSelectedHotel((selectedHotel) => ({
      ...selectedHotel,
      hotelId: false,
    }));

  return (
    <>
      {selectedHotel.hotelId && (
        <PlanTripHotelDetails
          isOpen={selectedHotel.isOpen}
          toggle={closeHotelModal}
          hotelId={selectedHotel.hotelId}
          filters={formatFilters(filterQueries)}
          unsetHotelDetails={unsetHotelDetails}
        />
      )}
      {placesCategories.categories.length > 0 && (
        <Modal
          className="plantrip__info-placesCategories"
          centered
          fade
          isOpen={placesCategories.isOpen}
          toggle={closePlacesRecommendation}>
          <ModalBody>
            {placesCategories.queried ? (
              <div>
                <h5>Choose from any of your recommended categories</h5>
                {placesCategories.categories.map((category) => (
                  <p
                    role="button"
                    onClick={() => {
                      setPlacesCategories((placesCategories) => ({
                        ...placesCategories,
                        selectedCategories: {
                          ...placesCategories.selectedCategories,
                          [category]: !placesCategories.selectedCategories[
                            category
                          ],
                        },
                      }));
                    }}
                    className={`plantrip__info-category ${
                      placesCategories.selectedCategories[category] &&
                      "plantrip__info-category--active"
                    }`}>
                    {category.replace("_", " ")}
                  </p>
                ))}
                <div className="plantrip__info-categoryBtns">
                  <Button
                    className="ml-auto mr-1"
                    color="success"
                    onClick={() => {
                      const selectedCategories = Object.keys(
                        placesCategories.selectedCategories
                      )
                        .filter(
                          (category) =>
                            placesCategories.selectedCategories[category]
                        )
                        .join(",");
                      getPlaces(selectedCategories);
                      closePlacesRecommendation();
                    }}>
                    Get recommendations
                  </Button>
                  <Button
                    color="danger"
                    onClick={closePlacesRecommendation}
                    className="mr-auto ml-1">
                    Back
                  </Button>
                </div>
              </div>
            ) : (
              <div className="plantrip__info--loader">
                <Loader
                  type="ThreeDots"
                  color="#007BFF"
                  height={100}
                  width={100}
                  className="loader-icon"
                />
                <p>{placesCategories.message}</p>
              </div>
            )}
          </ModalBody>
        </Modal>
      )}
      <div className="plantrip__info-sidebar">
        <ListGroup className="plantrip__sidebar-items">
          <h2 className="pb-3 pl-4">Waypoints</h2>
          {stops.map((stop, index) => (
            <ListGroupItem
              key={index}
              className={clsx({
                "plantrip__sidebar-item": true,
                active: selectedStop === index,
              })}
              onClick={() => setSelectedStop(index)}>
              <ListGroupItemText>{stop.name}</ListGroupItemText>
            </ListGroupItem>
          ))}
        </ListGroup>
        {/* <Button
          color="primary"
          onClick={() =>
            setSelectedHotel((selectedHotel) => ({
              hotelId: 1,
              isOpen: true,
            }))
          }>
          Open Modal
        </Button> */}
      </div>
      <div className="plantrip__info-main">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={clsx({ active: activeTab === "1" })}
              onClick={() => setActiveTab("1")}>
              Hotels & Accomodation
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={clsx({ active: activeTab === "2" })}
              onClick={() => setActiveTab("2")}>
              Sight-seeing & Places of Interest
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <div className="plantrip__info--container">
              <div className="plantrip__info-hotels">
                {hotelInfo.hotels.length
                  ? hotelInfo.hotels.map((item, index) => (
                      <PlanTripHotelOverview
                        key={`overview-${index}`}
                        onClickDetails={() => {
                          setSelectedHotel({ hotelId: item.id, isOpen: true });
                        }}
                        {...item}
                      />
                    ))
                  : hotelInfo.queried && (
                      <div className="plantrip__info--loader">
                        <p>No information found with the selected filters!</p>
                      </div>
                    )}
                {hotelInfo.message && (
                  <div className="plantrip__info--loader">
                    <Loader
                      type="ThreeDots"
                      color="#007BFF"
                      height={100}
                      width={100}
                      className="loader-icon"
                    />
                    <p>{hotelInfo.message}</p>
                  </div>
                )}
              </div>
              <div className="plantrip__info-query">
                <div className="plantrip__info-query--header">
                  <h4 className="hotelQuery-heading">Find what suits you</h4>
                </div>
                <div className="plantrip__info-query--buttons">
                  <Button color="primary" onClick={() => getHotels()}>
                    Filter
                  </Button>
                  <Button color="danger" onClick={() => getHotels(true)}>
                    Recommend
                  </Button>
                </div>
                <div className="plantrip__info-query--queries">
                  <Form>
                    <FormGroup>
                      <Label for="check-in">Check-In Date</Label>
                      <Input
                        type="date"
                        id="check-in"
                        value={filterQueries.checkin_date}
                        onChange={(e) =>
                          setQuery("checkin_date", e.target.value)
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="check-out">Check-Out Date</Label>
                      <Input
                        type="date"
                        id="check-out"
                        value={filterQueries.checkout_date}
                        onChange={(e) =>
                          setQuery("checkout_date", e.target.value)
                        }
                      />
                    </FormGroup>
                    <Row form>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="adults">Adults</Label>
                          <Input
                            type="number"
                            id="adults"
                            value={filterQueries.adults_number}
                            min="1"
                            max="6"
                            onChange={(e) =>
                              setQuery("adults_number", e.target.value)
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md={8}>
                        <FormGroup>
                          <Label for="minGuestRating">
                            Minimum Guest Rating
                          </Label>
                          <Input
                            type="number"
                            id="minGuestRating"
                            value={filterQueries.guest_rating_min}
                            min="0"
                            max="5"
                            onChange={(e) =>
                              setQuery("guest_rating_min", e.target.value)
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <Label for="price">Choose price range (in 100USD)</Label>
                      <Slider
                        min={filterQueries.price_min}
                        max={filterQueries.price_max}
                        minValue={0}
                        maxValue={10}
                        onChange={([min, max]) => {
                          setQuery("price_min", min);
                          setQuery("price_max", max);
                        }}
                        pearling
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="sort">Sort results by</Label>
                      <Select
                        defaultValue={[filterQueries.sort_order]}
                        options={sortOptions}
                        onChange={(option) => setQuery("sort_order", option)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="starRating">Star Rating</Label>
                      <Select
                        styles={customSelectStyle}
                        defaultValue={filterQueries.star_rating_ids}
                        options={starRatingOptions}
                        isMulti
                        value={filterQueries.star_rating_ids}
                        onChange={(option) =>
                          setQuery("star_rating_ids", option)
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="amenities">Facilities</Label>
                      <Select
                        styles={customSelectStyle}
                        defaultValue={filterQueries.amenity_ids}
                        options={amenitiesOptions}
                        isMulti
                        value={filterQueries.amenity_ids}
                        onChange={(option) => setQuery("amenity_ids", option)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="themes">Themes</Label>
                      <Select
                        styles={customSelectStyle}
                        defaultValue={filterQueries.theme_ids}
                        options={themesOptions}
                        isMulti
                        value={filterQueries.theme_ids}
                        onChange={(option) => setQuery("theme_ids", option)}
                      />
                    </FormGroup>
                  </Form>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane tabId="2">
            <div className="plantrip__info--container">
              <div className="plantrip__info-places">
                {placesInfo.places.length
                  ? placesInfo.places.slice(0, 40).map((item, index) => (
                      // <PlanTripHotelOverview
                      //   key={`overview-${index}`}
                      //   onClickDetails={() => {
                      //     setSelectedHotel({ hotelId: item.id, isOpen: true });
                      //   }}
                      //   {...item}
                      // />
                      <PlanTripPlacesOverview
                        key={item.id}
                        name={item.properties.name}
                        rating={item.properties.rate}
                        thumbnail={item.thumbnail}
                        distance={item.properties.dist}
                        tags={item.properties.kinds}
                      />
                    ))
                  : placesInfo.queried && (
                      <div className="plantrip__info--loader">
                        <p>No information found with the selected filters!</p>
                      </div>
                    )}
                {placesInfo.message && (
                  <div className="plantrip__info--loader">
                    <Loader
                      type="ThreeDots"
                      color="#007BFF"
                      height={100}
                      width={100}
                      className="loader-icon"
                    />
                    <p>{placesInfo.message}</p>
                  </div>
                )}
              </div>
              <div className="plantrip__info-query">
                <div className="plantrip__info-query--header">
                  <h4 className="hotelQuery-heading">Find what suits you</h4>
                </div>
                <div className="plantrip__info-query--buttons">
                  <Button color="primary" onClick={() => getPlaces()}>
                    Filter
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => getPlacesRecommendation()}>
                    Recommend
                  </Button>
                </div>
                <div className="plantrip__info-query--queries">
                  <Form>
                    <FormGroup>
                      <Label for="radius">
                        Preferred proximity (radius): {poiQueries.radius / 1000}{" "}
                        KM
                      </Label>
                      <Input
                        type="range"
                        value={poiQueries.radius}
                        min={1000}
                        max={50000}
                        onChange={(e) => {
                          updatePoiQueries((poiQueries) => ({
                            ...poiQueries,
                            radius: e.target.value,
                          }));
                        }}
                        step={1000}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="query">Search query: </Label>
                      <Input
                        id="query"
                        value={poiQueries.query}
                        onChange={(e) =>
                          updatePoiQueries((poiQueries) => ({
                            ...poiQueries,
                            query: e.target.value,
                          }))
                        }
                        maxLength={3}
                        placeholder="Enter 3-letter search query"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Categories: </Label>
                      {useMemo(
                        () => (
                          <DropdownTreeSelect
                            data={poiFilterOptions}
                            onChange={(_, selectedNodes) => {
                              updatePoiQueries((poiQueries) => ({
                                ...poiQueries,
                                categories: selectedNodes
                                  .map((node) => node.value)
                                  .join(","),
                              }));
                            }}
                            className="plantrip__info-query--dropdownTree"
                            texts={{
                              placeholder: "Choose your preferred categories",
                              noMatches: "No matches!",
                            }}
                          />
                        ),
                        []
                      )}
                    </FormGroup>
                  </Form>
                </div>
              </div>
            </div>
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};

export default PlanTripInformation;
