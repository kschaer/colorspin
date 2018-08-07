import React from "react";
import { PaperContainer, Circle, Layer } from "@psychobolt/react-paperjs";
import { connect } from "react-redux";
import { css } from "emotion";

const Shapes = () => (
  <Circle center={[120, 50]} radius={35} fillColor="#00FF00" />
);

const Papery = props => {
  const Shapes = () => (
    <Circle center={[120, 50]} radius={35} fillColor="#00FF00" />
  );
  const dynamicCircles = props.colors.map(color => (
    <Circle
      key={color}
      center={[500 * Math.random(), 500 * Math.random()]}
      radius={10 + 30 * Math.random()}
      fillColor={color.hex}
    />
  ));
  console.log("LOTS OF CIRCLES", dynamicCircles);
  return (
    <div>
      <PaperContainer
        {...props}
        className={css`
          height: 100%;
          width: 80%;
        `}
      >
        <Circle center={[80, 50]} radius={35} fillColor="red" />
        <Layer>
          {props.colors.map(color => (
            <Circle
              key={color.hex}
              center={[500 * Math.random(), 500 * Math.random()]}
              radius={10 + 200 * Math.random()}
              fillColor={color.hex}
            />
          ))}
        </Layer>
      </PaperContainer>
    </div>
  );
};

const mapState = state => {
  return {
    colors: state.color.curColors
  };
};
export default connect(mapState)(Papery);
