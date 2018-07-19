import React, { Component } from "react";
import axios from "axios";
import "./App.css";

import makeAnimatedChart from "./ColorChart";

class App extends Component {
  constructor() {
    super();
    this.state = {
      colors: [],
      done: false
    };
    this.makeChart = this.makeChart.bind(this);
  }

  async componentDidMount() {
    try {
      let res = await axios.get("/api/colors");
      let data = res.data;
      this.setState({ colors: data });
      console.log("what data??", data);
    } catch (err) {
      console.log("err!", err);
    }
  }
  makeChart(data) {
    return makeAnimatedChart(data);
  }

  render() {
    const colorData = this.state.colors;
    let myChart;
    if (this.state.colors.length) {
      myChart = this.makeChart(this.state.colors);
      console.log(myChart);
    }
    // this.state.colors.length && this.makeChart(this.state.colors);
    return (
      <div className="App">
        <div>
          <h1>Colors</h1>
          {this.state.colors.map(color => (
            <div key={color.id}>{color.name}</div>
          ))}
        </div>
        <div className="mycharts">{this.state.colors.length && myChart}</div>
      </div>
    );
  }
}

export default App;
