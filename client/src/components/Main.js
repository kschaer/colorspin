import React, { Component } from "react";
import axios from "axios";
import ColorPicker from "./ColorPicker";
import { css, keyframes } from "emotion";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import Paperview from "./Paperview";
import Papery from "./Papery";
import ThreeCanvas from "./ThreeCanvas"

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
              display: flex;
              animation: ${bounce} 2s ease;
              background-color: #ffffff;
              padding: 40px;
              flex-direction: row;
              align-items: stretch;

              justify-content: center;
            `}
          >
            {/* <SketchPicker onChangeComplete={this.handlePickerChange} /> */}
            <ColorPicker
              className={css`
                flex-grow: 1;
              `}
            />
            {/* <Paperview
              className={css`
                flex-grow: 4;
                background-color: #ff00cc;
              `}
            /> */}
            {/* <Papery /> */}
            <ThreeCanvas />
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
