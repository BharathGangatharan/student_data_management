import { createBrowserHistory } from "history";
 
// import our logger for redux
//import { createLogger } from "redux-logger";
 
// import a library to handle async with redux
import thunk from "redux-thunk";
 
// import the redux parts needed to start our store
import { applyMiddleware, legacy_createStore as createStore } from "redux";
 
// import the middleware for using react router with redux
import { routerMiddleware } from "react-router-redux";
 
// import the already combined reducers for redux to use
import rootReducer from ".";
 
// import  API wrapper for use with Redux
import * as api from "../services";
 
import { composeWithDevTools } from "@redux-devtools/extension";
 
//import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
 
// create and export history for router
export const history = createBrowserHistory();
 
// combine the middlewares we're using into a constant so that it can be used by our store
const middleware = [thunk.withExtraArgument(api), routerMiddleware(history)];
 
// declare any enhancers here
const enhancers = [];
 
// compose our middleware
const composedEnhancers = composeWithDevTools(
    applyMiddleware(...middleware),
    ...enhancers
);
//Checking for local storage
// const persistState = JSON.parse(localStorage.getItem(`state`)) || [];
 
// create our redux store using our reducers and our middleware, and export it for use in index.js
const store = createStore(rootReducer, composedEnhancers);
 
export default store;