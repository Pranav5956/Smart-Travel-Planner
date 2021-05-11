import React from "react";
import ReactStarRatingComponent from "react-star-rating-component";
import { Badge, Button } from "reactstrap";
import { updateItineraryWeights } from "../../requests/itineraries";
import { useParams } from "react-router";

const PlanTripPLacesOverview = ({
  id,
  stopName,
  name,
  rating,
  thumbnail,
  distance,
  tags,
  onClickDetails,
  setItinerary,
  itinerary,
  ...props
}) => {
  const params = useParams();

  const addToItinerary = async () => {
    setItinerary((itinerary) => ({
      ...itinerary,
      POI: [
        ...itinerary.POI,
        {
          name: name,
          xid: id,
          kinds: tags,
          thumbnail,
          stopName,
        },
      ],
    }));
    const weights = {
      added: {
        POI: [{ xid: id }],
        hotels: [],
      },
      removed: { hotels: [], POI: [] },
      saveType: "soft",
    };
    await updateItineraryWeights(params.itineraryId, weights);
  };

  const removeFromItinerary = async () => {
    setItinerary((itinerary) => ({
      ...itinerary,
      POI: itinerary.POI.filter((place) => place.xid !== id),
    }));
    const weights = {
      removed: {
        POI: [{ xid: id }],
        hotels: [],
      },
      added: { hotels: [], POI: [] },
      saveType: "soft",
    };
    await updateItineraryWeights(params.itineraryId, weights);
  };

  return (
    <div className="plantrip__place-overview" {...props}>
      <div className="place__overview-thumbnail--cropper">
        <img
          src={
            thumbnail ||
            "https://www.google.com/url?sa=i&url=https%3A%2F%2Fgithub.com%2Fcockpit-project%2Fcockpit%2Fissues%2F8197&psig=AOvVaw38VRCMaKqHHQ6EuvfMIG4i&ust=1620279268330000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNDj6eTosfACFQAAAAAdAAAAABAY"
          }
          {...(!thumbnail ? { alt: name } : {})}
          width="250"
          height="140"
        />
      </div>
      <div className="place__overview-info">
        <h5 className="place__overview-name">{name}</h5>
        <div className="place__overview-tags">
          {tags.split(",").map((tag, index) => (
            <Badge pill className="mr-1" color="primary" key={`tag-${index}`}>
              {tag.replace("_", " ")}
            </Badge>
          ))}
        </div>
        <div className="place__overview-attributes">
          <ReactStarRatingComponent
            editing={false}
            starCount={5}
            value={5 - rating + 1}
            aria-label={`${5 - rating + 1}/5 stars`}
          />
        </div>
        <div className="place__overview-landmarks">
          <p className="mb-2">
            Distance from city:{" "}
            {distance > 1000
              ? `${(distance / 1000).toFixed(2)} km`
              : `${distance.toFixed(2)} m`}
          </p>
        </div>
        <div className="place__overview-buttons">
          {itinerary.POI.filter((place) => place.xid === id).length > 0 ? (
            <Button color="danger" size="sm" onClick={removeFromItinerary}>
              Remove from Itinerary
            </Button>
          ) : (
            <Button color="success" size="sm" onClick={addToItinerary}>
              Add to Itinerary
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanTripPLacesOverview;
