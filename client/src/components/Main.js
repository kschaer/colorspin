import React, { Component } from "react";
import axios from "axios";
import ColorPicker from "./ColorPicker";

class Main extends Component {
  constructor() {
    super();
  }
  componentDidMount() {}
  render() {
    return (
      <div>
        <div>MAINNNNNN</div>
        <div>colorsss</div>
        <ColorPicker />
      </div>
    );
  }
}
export default Main;
