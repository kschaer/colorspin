import React, { Component } from "react";
import { SketchPicker } from "react-color";
import { css } from "emotion";
import { setNewColor } from "../store/color";
import { connect } from "react-redux";

class ColorPicker extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (color, event) => {
    event.preventDefault();
    console.log("new color,", color);
    this.props.setNewColor(color.hex);
  };
  render() {
    return (
      <div>
        <SketchPicker
          onChangeComplete={this.handleChange}
          color={this.props.lastColor}
        />
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
const mapState = state => {
  return {
    curColors: state.color.curColors,
    lastColor: state.color.curColors[state.color.curColors.length - 1]
  };
};
const mapDispatch = dispatch => {
  return {
    setNewColor: color => dispatch(setNewColor(color))
  };
};
export default connect(
  mapState,
  mapDispatch
)(ColorPicker);
