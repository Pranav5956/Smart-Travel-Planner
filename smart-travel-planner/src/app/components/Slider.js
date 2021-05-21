import React from "react";
import ReactSlider from "react-slider";
import styled from "styled-components";

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledThumb = styled.div`
  height: 25px;
  line-height: 25px;
  width: 25px;
  text-align: center;
  background-color: #007bff;
  color: #fff;
  border-radius: 50%;
  cursor: grab;
  font-size: 0.7rem;
`;

const Thumb = (props, state) => (
  <StyledThumb {...props}>{state.valueNow}</StyledThumb>
);

const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props) => (props.index === 1 ? "#007bff" : "#ddd")};
  border-radius: 1em;
`;

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

const Slider = ({ min, max, onChange }) => {
  return (
    <div className="m-2 mt-3">
      <StyledSlider
        defaultValue={[min, max]}
        min={0}
        max={10}
        renderTrack={Track}
        renderThumb={Thumb}
        onChange={onChange}
        pearling
        minDistance={1}
      />
    </div>
  );
};

export default Slider;
