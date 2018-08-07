import React, { Component } from "react";
import axios from "axios";
import ColorPicker from "./ColorPicker";
import { css, keyframes } from "emotion";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import ContainerDimensions from "react-container-dimensions";

import ThreeCanvas from "./ThreeCanvas";

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
    console.log("REFS", this.refs.child);
    //    const { width } = this.props.size;
    console.log("width", this.props.size);
    return (
      <div>
        <div className="container">
          <div>
            <Navbar />
          </div>
          <div className="row">
            <div id="maincontainer" className="col sm4">
              <ColorPicker />
            </div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            margin: 0,
            padding: 0,
            zIndex: -1000
          }}
        >
          <ThreeCanvas />
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
