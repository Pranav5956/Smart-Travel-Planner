import clsx from "clsx";
import React, { useEffect, useState } from "react";
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
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import moment from "moment";
import Select from "react-select";
import Slider from "../components/Slider";

import {
  sortOptions,
  starRatingOptions,
  amenitiesOptions,
  themesOptions,
} from "../data/QueryOptions";

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
    price_max: filters.price_max.toString(),
    price_min: filters.price_min.toString(),
    guest_rating_min: filters.guest_rating_min.toString(),
    ...(star_rating_ids && { star_rating_ids }),
    ...(amenity_ids && { amenity_ids }),
    ...(theme_ids && { theme_ids }),
  };

  return formattedFilters;
};

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
  const [selected, setSelected] = useState(stops.length - 1);
  const [activeTab, updateActiveTab] = useState("1");
  const [hotelInfo, setHotelInfo] = useState(null);
  const [filterQueries, updateFilterQueries] = useState({
    checkin_date: getFormattedDate(),
    checkout_date: getFormattedDate(1),
    adults_number: 1,
    sort_order: sortOptions[0],
    price_min: 0,
    price_max: 10,
    guest_rating_min: 7,
    star_rating_ids: [starRatingOptions[0]],
    amenity_ids: [],
    theme_ids: [],
  });

  useEffect(() => {
    setSelected(stops.length - 1);
  }, [stops, setSelected]);

  useEffect(() => {
    formatFilters(filterQueries);
  }, [filterQueries]);

  const setQuery = (query, value) => {
    updateFilterQueries({ ...filterQueries, [query]: value });
  };

  const setActiveTab = (tab) => updateActiveTab(tab);

  useEffect(() => {
    setHotelInfo(null);
    setTimeout(() => {
      setHotelInfo({});
    }, 5000);
  }, [selected]);

  return (
    <>
      <div className="plantrip__info-sidebar">
        <ListGroup className="plantrip__sidebar-items">
          {stops.map((stop, index) => (
            <ListGroupItem
              key={index}
              className={clsx({
                "plantrip__sidebar-item": true,
                active: selected === index,
              })}
              onClick={() => setSelected(index)}>
              <ListGroupItemText>{stop.name}</ListGroupItemText>
            </ListGroupItem>
          ))}
        </ListGroup>
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
            <div className="plantrip__info-hotelsContainer">
              <div className="plantrip__info-hotels">
                {hotelInfo
                  ? `Hotel information in "${stops[selected].name}"`
                  : "Fetching information about Hotels..."}
              </div>
              <div className="plantrip__info-hotelQuery">
                <div className="plantrip__info-hotelQuery--header">
                  <h4 className="hotelQuery-heading">Find what suits you</h4>
                  <Button color="primary">Filter</Button>
                </div>
                <div className="plantrip__info-hotelQuery--queries">
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
                      <Col md={5}>
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
                      <Col md={7}>
                        <FormGroup>
                          <Label for="minGuestRating">
                            Minimum Guest Rating
                          </Label>
                          <Input
                            type="number"
                            id="minGuestRating"
                            value={filterQueries.guest_rating_min}
                            min="0"
                            max="10"
                            onChange={(e) =>
                              setQuery("guest_rating_min", e.target.value)
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <Label for="price">
                        Choose maximum price (in 100USD)
                      </Label>
                      <Slider
                        min={filterQueries.price_min}
                        max={filterQueries.price_max}
                        onChange={([min, max]) => {
                          setQuery("price_min", min);
                          setQuery("price_max", max);
                        }}
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
            Fetching information about Places of Interest
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};

export default PlanTripInformation;
