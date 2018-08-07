import React, { Component } from "react";
import axios from "axios";
import ColorPicker from "./ColorPicker";
import { SketchPicker } from "react-color";
import { css, keyframes } from "emotion";
import { connect } from "react-redux";
import Navbar from "./Navbar";
const springOptions = {
  stiffness: 0.8,
  damping: 0.5,
  precision: 4,
  unit: "px"
};
class Main extends Component {
  constructor() {
    super();
    this.state = {
      bgColor: "aliceblue",
      animate: ""
    };
    //this.handlePickerChange = this.handlePickerChange.bind(this);
  }
  componentDidMount() {}
  // handlePickerChange = (color, event) => {
  //   event.preventDefault();
  //   console.log("COLOR", color);
  //   this.setState({ bgColor: color.hex });
  //   const animator = keyframes`
  //     0% {backgroundColor: ${color.hex}}
  //     100% {backgroundColor: #90000}
  //   `;
  //   this.setState({ animate: animator });
  // };

  render() {
    const bounce = keyframes`
  0% {
    background-color: #FFFFFF
  }
  10% {
    background-color: ${this.props.lastColor.hex}
  }
  100% {
    background-color: #FFFFFF
  }
`;
    const cssAnimated = ``;
    console.log("NEW NEW", this.props.lastColor, this.props.lastColor);
    return (
      <div
        className={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <div>
          <Navbar />
        </div>
        <div>
          <div
            id="maincontainer"
            className={css`
              animation: ${bounce} 2s ease;
              background-color: #ffffff;
              padding: 40px;
            `}
          >
            <div>
              {/* <SketchPicker onChangeComplete={this.handlePickerChange} /> */}
              <ColorPicker />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapState = state => {
  return {
    bgColor: state.color.curColors[state.color.curColors.length - 1],
    lastColor: state.color.lastColor
  };
};
export default connect(mapState)(Main);
