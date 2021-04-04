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

const PlanTripInformation = ({ stops }) => {
  const [selected, setSelected] = useState(stops.length - 1);
  const [activeTab, updateActiveTab] = useState(1);
  const [hotelInfo, setHotelInfo] = useState(null);
  const [filterQueries, updateFilterQueries] = useState({
    checkIn: getFormattedDate(),
    checkOut: getFormattedDate(1),
    adults: 1,
    sort: sortOptions[0],
    price: { min: 0, max: 10000 },
    minGuestRating: 7,
    starRatings: [starRatingOptions[0]],
    amenities: [],
    themes: [],
  });

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
                        value={filterQueries.checkIn}
                        onChange={(e) => setQuery("checkIn", e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="check-out">Check-Out Date</Label>
                      <Input
                        type="date"
                        id="check-out"
                        value={filterQueries.checkOut}
                        onChange={(e) => setQuery("checkOut", e.target.value)}
                      />
                    </FormGroup>
                    <Row form>
                      <Col md={5}>
                        <FormGroup>
                          <Label for="adults">Adults</Label>
                          <Input
                            type="number"
                            id="adults"
                            value={filterQueries.adults}
                            min="1"
                            max="6"
                            onChange={(e) => setQuery("adults", e.target.value)}
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
                            value={filterQueries.minGuestRating}
                            min="0"
                            max="10"
                            onChange={(e) =>
                              setQuery("minGuestRating", e.target.value)
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <Label for="sort">Sort results by</Label>
                      <Select
                        defaultValue={[filterQueries.sort]}
                        options={sortOptions}
                        onChange={(option) => setQuery("sort", option)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="price">Choose maximum price</Label>
                      <Slider
                        min={filterQueries.price.min}
                        max={filterQueries.price.max}
                        onChange={([min, max]) =>
                          setQuery("price", { min, max })
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="starRating">Star Rating</Label>
                      <Select
                        defaultValue={filterQueries.starRatings}
                        options={starRatingOptions}
                        isMulti
                        value={filterQueries.starRatings}
                        onChange={(option) =>
                          setQuery(
                            "starRatings",
                            option.length ? option : filterQueries.starRatings
                          )
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="amenities">Amenities</Label>
                      <Select
                        defaultValue={filterQueries.amenities}
                        options={amenitiesOptions}
                        isMulti
                        value={filterQueries.amenities}
                        onChange={(option) => setQuery("amenities", option)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="themes">Themes</Label>
                      <Select
                        defaultValue={filterQueries.themes}
                        options={themesOptions}
                        isMulti
                        value={filterQueries.themes}
                        onChange={(option) => setQuery("themes", option)}
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
