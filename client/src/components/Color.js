import React, { Component } from "react";
import axios from "axios";

class Color extends Component {
  constructor() {
    super();
    this.state = {
      color: "#FFFCCC",
      pantoneValue: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>change color</label>
          <input
            type="text"
            value={this.state.color}
            onChange={this.handleChange}
            name="color"
          />
          <button type="submit">submit color</button>
        </form>
      </div>
    );
  }
}

export default Color;
