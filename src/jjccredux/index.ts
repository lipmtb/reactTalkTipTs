import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";//异步action
import allReducer from "./reducers";
export default createStore(allReducer, composeWithDevTools(applyMiddleware(thunk)));

