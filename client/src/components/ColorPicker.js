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
    this.props.setNewColor(color);
  };
  render() {
    return (
      <SketchPicker
        disableAlpha={false}
        onChangeComplete={this.handleChange}
        color={this.props.lastColor.hsl}
        style={{ background: "rgba(100, 100, 100, .3)" }}
      />
    );
  }
}
const mapState = state => {
  return {
    curColors: state.color.curColors,
    lastColor: state.color.lastColor
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
