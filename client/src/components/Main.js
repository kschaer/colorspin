import React, { Component } from "react";
import axios from "axios";
import ColorPicker from "./ColorPicker";
import { SketchPicker } from "react-color";
import { css } from "emotion";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      bgColor: "aliceblue"
    };
    this.handlePickerChange = this.handlePickerChange.bind(this);
  }
  componentDidMount() {}
  handlePickerChange = color => {
    console.log("COLOR", color);
    this.setState({ bgColor: color.hex });
  };
  render() {
    return (
      <div>
        <div
          className={css({
            display: "flex",
            backgroundColor: "lightGray",
            "&:hover": {
              backgroundColor: this.state.bgColor
            }
          })}
        >
          <div>MAINNNNNN</div>
          <div>colorsss</div>
        </div>
        <div>
          {/* <SketchPicker onChangeComplete={this.handlePickerChange} /> */}
          <ColorPicker />
        </div>
      </div>
    );
  }
}
export default Main;
