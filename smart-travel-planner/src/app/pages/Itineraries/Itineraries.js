import moment from "moment";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import {
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";
import ItineraryMain from "../../components/ItineraryMain";
import ProtectedRoute from "../../components/ProtectedRoute";
import FilterResults from "react-filter-search";
import { getAllItineraries } from "../../requests/itineraries";
import "./Itineraries.css";

const getTimeText = (time) => {
  const timeObject = moment(time);
  return timeObject.fromNow();
};

const Itineraries = () => {
  useEffect(() => {
    (async () => {
      const response = await getAllItineraries();
      const allItinerariesOfUser = response.data.itineraries;
      setItineraries(allItinerariesOfUser);
      console.log(allItinerariesOfUser);
    })();
  }, []);

  const [itineraries, setItineraries] = useState([]);
  const [activeItinerary, setActiveItinerary] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="itinerary">
      <div className="itinerary__sidebar">
        <h3>My Itineraries</h3>
        <FormGroup className="itinerary__sidebar-search">
          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search itineraries"
          />
          <FaSearch aria-hidden={true} />
        </FormGroup>
        <FilterResults
          value={searchQuery}
          data={itineraries.map((itinerary) => ({
            _id: itinerary._id,
            name: itinerary.name,
            createdAt: itinerary.createdAt,
          }))}
          renderResults={(results) => (
            <ListGroup className="itinerary__sidebar-itineraries">
              {results.length > 0 ? (
                results.map((itinerary) => (
                  <Link
                    to={`/itineraries/${itinerary._id}`}
                    key={itinerary._id}
                    style={{ textDecoration: "none" }}>
                    <ListGroupItem
                      className="itinerary__sidebar-itinerary"
                      active={activeItinerary === itinerary._id}>
                      <ListGroupItemHeading className="itinerary__sidebar-itineraryName">
                        {itinerary.name}
                      </ListGroupItemHeading>
                      <ListGroupItemText className="itinerary__sidebar-itineraryCreatedAt mb-1">
                        Created {getTimeText(itinerary.createdAt)}
                      </ListGroupItemText>
                    </ListGroupItem>
                  </Link>
                ))
              ) : (
                <div className="itinerary__sidebar-noResults">
                  No matching itineraries found!
                </div>
              )}
            </ListGroup>
          )}
        />
      </div>
      <div className="itinerary__main">
        <Switch>
          <ProtectedRoute path="/itineraries/:itineraryId">
            <ItineraryMain setActiveItinerary={setActiveItinerary} />
          </ProtectedRoute>
          <Route path="/itineraries" exact>
            <div className="select-itinerary">
              <h4>Select an Itinerary to view</h4>
              <p>
                Choose from your itineraries on the left or search for them
                using the search box.
              </p>
            </div>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Itineraries;
