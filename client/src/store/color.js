import axios from "axios";
const GET_COLOR = "GET_COLOR";
const GET_ALL_COLORS = "GET_ALL_COLORS";

const initialState = {
  color: {},
  allColors: []
};

const getColor = color => ({ type: GET_COLOR, color });
const getAllColors = colors => ({ type: GET_ALL_COLORS, colors });

export const fetchColor = color => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/colors/${color}`);
      const color = response.data;
      dispatch(getColor(color));
    } catch (err) {
      console.log("error fetching color", err.message);
    }
  };
};

export const fetchAllColors = () => {
  return async dispatch => {
    try {
      const response = await axios.get("/api/colors");
      const colors = response.data;
      dispatch(getAllColors(colors));
    } catch (err) {
      console.log("error fetchig all colors", err.message);
    }
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COLOR:
      return { ...state, color: action.color };
    case GET_ALL_COLORS:
      return { ...state, colors: action.colors };
    default:
      return state;
  }
};
