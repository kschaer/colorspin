import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import { Main } from "./components";

import makeAnimatedChart from "./ColorChart";

class App extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     colors: [],
  //     done: false
  //   };
  //   this.makeChart = this.makeChart.bind(this);
  // }

  // async componentDidMount() {
  //   try {
  //     let res = await axios.get("/api/colors");
  //     let data = res.data;
  //     this.setState({ colors: data });
  //     console.log("what data??", data);
  //   } catch (err) {
  //     console.log("err!", err);
  //   }
  // }
  // makeChart(data) {
  //   //return makeAnimatedChart(data);
  // }

  render() {
    return (
      <div className="App">
        {/* <Navbar /> */}
        <Main />
      </div>
    );
  }
}

export default App;
