import React, { Component } from "react";
import { css, keyframes } from "emotion";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const Navbar = props => {
  const lastColor = props.lastColor.hex || "#FFAABB";
  const colorBounce = keyframes`
  0% {
    background-color: #000000
  }
  10% {
    background-color: ${lastColor}
  }
  100% {
    background-color: #000000
  }
`;
  const colorBounceCss = css`
    animation: ${colorBounce} 1s ease;
  `;
  return (
    <div className={`container ${colorBounceCss}`}>
      <div className={`row`}>
        <div className="col s4 center-align">
          <NavLink to="/browse">
            <h5>browse</h5>
          </NavLink>
        </div>
        <div className="col s4 center-align">
          <NavLink to="/random">
            <h5>randomize</h5>
          </NavLink>
        </div>
        <div className="col s4 center-align">
          <NavLink to="/export">
            <h5>export</h5>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
const mapState = state => {
  return {
    bgColor: state.color.curColors[state.color.curColors.length - 1],
    lastColor: state.color.lastColor
  };
};
export default connect(mapState)(Navbar);
