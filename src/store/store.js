import { compose, applyMiddleware, createStore } from "redux";
// import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("currentState: ", store.getState());

  next(action);

  console.log("nextState: ", store.getState());
};

const middleWares = [
  process.env.NODE_ENV === "development" && loggerMiddleware,
];

const composedEnhancers = compose(applyMiddleware(...middleWares));

//root-reducer
export const store = createStore(rootReducer, undefined, composedEnhancers);