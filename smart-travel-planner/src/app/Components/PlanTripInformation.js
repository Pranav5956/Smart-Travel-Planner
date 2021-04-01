import clsx from "clsx";
import React, { useState } from "react";
import { ListGroup, ListGroupItem, ListGroupItemText } from "reactstrap";

const PlanTripInformation = ({ stops }) => {
  const [selected, setSelected] = useState(stops.length - 1);

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
      <div className="plantrip__info-main"></div>
    </>
  );
};

export default PlanTripInformation;
