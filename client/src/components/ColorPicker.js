import React, { Component } from "react";
import { SketchPicker } from "react-color";
import { css } from "emotion";

class ColorPicker extends React.Component {
  render() {
    return (
      <div>
        <SketchPicker />
        <div
          className={css({
            backgroundColor: "pink",
            "&:hover": {
              backgroundColor: "lightgreen"
            }
          })}
        >
          hiiiiii
        </div>
      </div>
    );
  }
}
export default ColorPicker;
