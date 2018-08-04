import axios from "axios";
const GET_PALETTE = "GET_PALETTE";
const GET_ALL_PALETTES = "GET_ALL_PALETTES";

const initialState = {
  palette: {},
  allPalettes: []
};

//action creators
const getPalette = palette => ({ type: GET_PALETTE, palette });
const getAllPalettes = palettes => ({ type: GET_ALL_PALETTES, palettes });

//thunks
export const fetchPalette = id => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/palettes/${id}`);
      const palette = response.data;
      dispatch(getPalette(palette));
    } catch (err) {
      console.log("err getting palette: ", err.message);
    }
  };
};

export const fetchPalettes = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`api/palettes`);
      const palettes = response.data;
      dispatch(getAllPalettes(palettes));
    } catch (err) {
      console.log("err getting all palettes: ", err.message);
    }
  };
};

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PALETTE:
      return { ...state, palette: action.palette };
    case GET_ALL_PALETTES:
      return { ...state, palettes: action.palettes };
    default:
      return state;
  }
};
