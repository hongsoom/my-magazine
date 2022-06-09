import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import magazine from "./modules/magazine";
import user from "./modules/user";

const middlewares = [thunk];

const enhancer = applyMiddleware(...middlewares);

const rootReducer = combineReducers({ 
    magazine : magazine,
    user : user,
});

const store = createStore(rootReducer, enhancer);

export default store;