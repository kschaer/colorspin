import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
// import {
//   Login,
//   Signup,
//   UserDashboard,
//   UserEdit,
//   ProductList,
//   ProductSingle,
//   OpenCart,
//   EditProduct,
//   AddProduct,
//   AllUsers,
//   AdminDashboard
// } from "./components";
//import ProductList from './components/shop/product-list'
// import ReviewList from "./components/reviews/ReviewList";
// import { me } from "./store";
import { fetchAllColors } from "../store/color";
/**
 * COMPONENT
 */
class Main extends Component {
  componentDidMount() {
    this.props.loadColors();
  }

  render() {
    return (
      <Switch>{/* Routes placed here are available to all visitors */}</Switch>
    );
  }
}

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {

//   };
// };

const mapDispatch = dispatch => {
  return {
    loadColors: () => dispatch(fetchAllColors)
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the  changes
export default withRouter(
  connect(
    null,
    mapDispatch
  )(Main)
);
