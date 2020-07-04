import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import productsReducer from "./reducers/products";

const rootReducer = combineReducers({
  products: productsReducer,
});

export default function configureStore(preloadedState) {
  const middlewares = [logger, thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];

  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  // HOT reload
  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept(rootReducer, () => store.replaceReducer(rootReducer));
  }

  return store;
}
