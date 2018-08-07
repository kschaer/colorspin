import React, { Component } from "react";
import { css } from "emotion";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const Navbar = props => {
  const buttonCss = css`
    background-color: #cee2e0;
    border-radius: 5px;
    border-width: 2px;
    border-color: ${props.lastColor.hex};
    text-transform: capitalize;
    padding: 0px 30px;
  `;
  const linkCss = css`
    background-color: #FF00AA
    text-transform: capitalize;
    :visited {
      text-decoration: none;
    }
  `;
  return (
    <div
      className={css`
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        padding: 20px;
        background-color: #bac8cf;
      `}
    >
      <NavLink className={buttonCss} to="/browse">
        <h3 className={linkCss}>browse</h3>
      </NavLink>
      <NavLink className={buttonCss} to="/random">
        <h3>randomize</h3>
      </NavLink>
      <NavLink className={buttonCss} to="/export">
        <h3>export</h3>
      </NavLink>
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
