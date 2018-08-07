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
      animate: "",
      hovered: ""
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
  onMouseOver(event) {}

  render() {
    return (
      <div>
        <div className="container">
          <div>
            <Navbar />
          </div>
          <div className="row">
            <div className="col s2">
              <div className="column">
                {this.props.curColors && this.props.curColors.length
                  ? this.props.curColors.map((color, index) => {
                      const animator = keyframes`
                        0% {
                          background-color: ${color.hex};

                        }
                        14% {
                          background-color: #FFFFFF;
                          border: 0.3em solid #ffffff;
                        }
                        100% {
                          background-color: ${color.hex};
                        }
                      `;
                      return (
                        // <div
                        //   className={css`
                        //     background-color: ${color.hex};
                        //     padding: 4px;
                        //     border-width: 3px;
                        //     border-color: red;
                        //     &:hover {
                        //       animation: ${animator} 1s ease;
                        //     }
                        //   `}
                        //   key={color.hex}
                        // >

                        // <div
                        //   className={`chip waves-effect waves-light  ${css`
                        //     background-color: ${color.hex};
                        //     border: 0.3em solid ${color.hex};
                        //     border-radius: 30px;
                        //     margin: auto;
                        //     padding: auto;
                        //     &:hover {
                        //       animation: ${animator} 1s ease;
                        //     }
                        //   `}`}
                        // >
                        //   {color.hex}
                        //   <i className="close material-icons">close</i>
                        // </div>
                        // <p key={color.hex + index}>{color.hex}</p>
                        //</div>
                        <div
                          className={`chip waves-effect waves-light ${css`
                            background-color: ${color.hex};
                          `}`}
                        >
                          {color.hex}
                          <i className="close material-icons">close</i>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
            <div className="col s6" />
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
export default connect(mapState)(Main);
