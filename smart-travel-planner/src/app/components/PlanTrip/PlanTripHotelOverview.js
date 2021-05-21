import React from "react";
import ReactStarRatingComponent from "react-star-rating-component";
import { Button } from "reactstrap";

const PlanTripHotelOverview = ({
  name,
  address,
  stars,
  avgGuestReviews,
  landmarks,
  price,
  thumbnail,
  onClickDetails,
  ...props
}) => {
  return (
    <div className="plantrip__hotel-overview" {...props}>
      <div className="hotel__overview-thumbnail--cropper">
        <img src={thumbnail} alt={name} width="250" height="140" />
      </div>
      <div className="hotel__overview-info">
        <h5 className="hotel__overview-name">{name}</h5>
        <p className="hotel__overview-address">{address}</p>
        <div className="hotel__overview-attributes">
          <ReactStarRatingComponent
            name={name + " rating"}
            editing={false}
            starCount={5}
            value={stars}
            aria-label={`${stars}/5 stars`}
          />
          <p className="hotel__overview-price">
            <span>{price[0]}</span>
            {price.slice(1)}
          </p>
        </div>
        <div className="hotel__overview-landmarks">
          <ul className="text-muted">
            {landmarks.map(({ label, distance }, index) => (
              <li key={index}>
                {distance} to {label}
              </li>
            ))}
          </ul>
        </div>
        <div className="hotel__overview-buttons">
          <Button color="primary" size="sm" onClick={onClickDetails}>
            View More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlanTripHotelOverview;
