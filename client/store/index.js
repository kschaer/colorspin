import { createStore, combineReducers, applyMiddelware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//import individual reducers here
import color from "./color";
import palette from "./palette";

const reducer = combineReducers({
  color,
  palette
});

const middleware = composeWithDevTools(
  applyMiddelware(thunkMiddleware, createLogger({ collapsed: true }))
);

store = createStore(reducer, middleware);
export default store;
