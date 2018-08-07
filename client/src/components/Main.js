import React, { Component } from "react";
import axios from "axios";
import ColorPicker from "./ColorPicker";
import { css, keyframes } from "emotion";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import ContainerDimensions from "react-container-dimensions";

import ThreeCanvas from "./ThreeCanvas";

import { removeColor } from "../store/color";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      bgColor: "aliceblue",
      animate: "",
      hovered: ""
    };
    this.removeColor = this.removeColor.bind(this);
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
  removeColor(color) {
    //event.preventDefault;
    console.log("REMOVING", color);
    this.props.removeColor(color);
  }

  render() {
    return (
      <div>
        <div className="container">
          <div>
            <Navbar />
          </div>
          <div className="row">
            <div className="col s3">
              <div className="column">
                {this.props.curColors && this.props.curColors.length
                  ? this.props.curColors.map((color, index) => {
                      const animator = keyframes`
                        0% {
                          background-color: ${color.hex};
                          border: solid .6em ${color.hex}
                        }
                        14% {
                          background-color: #FFFFFF;
                          border: solid .6em #00000022

                        }
                        100% {
                          background-color: ${color.hex};
                          border: solid .6em ${color.hex}
                        }
                      `;
                      return (
                        <div
                          key={color.rgb.r + index}
                          className={`row waves-effect waves-light valign-wrapper ${css`
                            z-index: 5;
                            border: solid 0.6em #ffffff22;
                            background-color: ${color.hex};
                            border-radius: 2em;
                            width: 100%;
                            height: ${Math.min(
                              80,
                              (window.innerHeight - 300) /
                                this.props.curColors.length
                            )}px;
                            &:hover {
                              animation: ${animator} 1s ease;
                            }
                          `}`}
                        >
                          <p
                            className={`col s8 valign ${css`
                              z-index: 10;
                              margin: 0px;
                              padding: 0px;
                              float: left;
                              width: 100%;
                              position: absolute;
                              top: 50%;
                              transform: translateY(-50%) translateX(10%);
                              left: 50%;
                            `}`}
                          >
                            {color.hex}
                          </p>
                          <i
                            className={`material-icons col s4 ${css`
                              z-index: 8;
                              margin: 0px;
                              padding: 0px;
                              float: left;
                              width: 100%;
                              position: absolute;
                              top: 50%;
                              transform: translateY(-50%) translateX(200%);
                              left: 50%;
                            `}`}
                            onClick={event => this.removeColor(color, event)}
                          >
                            close
                          </i>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
            <div className="col s5" />
            <div id="picker" className="col s4 right-align">
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
    lastColor: state.color.lastColor,
    curColors: state.color.curColors
  };
};
const mapDispatch = dispatch => {
  return {
    removeColor: color => dispatch(removeColor(color))
  };
};
export default connect(
  mapState,
  mapDispatch
)(Main);
