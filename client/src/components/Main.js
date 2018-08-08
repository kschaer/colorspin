import React, { Component } from "react";
import ColorPicker from "./ColorPicker";
import { connect } from "react-redux";
import Navbar from "./Navbar";

import ThreeCanvas from "./ThreeCanvas";

import { removeColor, reorderColors, setActiveColor } from "../store/color";

import { arrayMove } from "react-sortable-hoc";

import { SortableList } from "./Colorbars";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      bgColor: "aliceblue",
      animate: "",
      hovered: "",
      currentColors: [],
      activeColor: {}
    };
    this.removeColor = this.removeColor.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
    this.onColorClick = this.onColorClick.bind(this);
    this.visibilityToggle = this.visibilityToggle.bind(this);
  }
  componentDidMount() {
    this.setState({ currentColors: this.props.curColors });
  }

  removeColor(color) {
    //event.preventDefault;
    console.log("REMOVING", color);
    this.props.removeColor(color);
    this.props.setActiveColor({});
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    // this.setState({
    //   currentColors: arrayMove(this.state.currentColors, oldIndex, newIndex)
    // });
    const newOrder = arrayMove(this.props.curColors, oldIndex, newIndex);
    console.log("NEW ORDER");
    this.props.reorderColors(newOrder);
  };
  onColorClick(color, event) {
    if (this.props.activeColor === color) {
      this.props.setActiveColor({});
      console.log("removing active color");
    } else {
      this.props.setActiveColor(color);
      console.log("new active color", color.hex);
    }
  }
  visibilityToggle(visibility, event) {
    if (visibility === "visible") {
      return "hidden";
    } else {
      return "visible";
    }
  }

  render() {
    return (
      <div>
        <div className="">
          <div>
            <Navbar />
          </div>
          <div className="row">
            <div className="col s3">
              <div className="container">
                {this.props.curColors && this.props.curColors.length ? (
                  <SortableList
                    onColorClick={this.onColorClick}
                    onSortEnd={this.onSortEnd}
                    visibilityToggle={this.visibilityToggle}
                    {...this.props}
                  />
                ) : null}
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
    curColors: state.color.curColors,
    activeColor: state.color.activeColor
  };
};
const mapDispatch = dispatch => {
  return {
    removeColor: color => dispatch(removeColor(color)),
    reorderColors: colors => dispatch(reorderColors(colors)),
    setActiveColor: color => dispatch(setActiveColor(color))
  };
};
export default connect(
  mapState,
  mapDispatch
)(Main);
