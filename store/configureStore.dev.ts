import { RootState } from "../types/state";
import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducers";

export default function configureStore(initialState: RootState) {
  const composeEnhancers =
    (typeof window !== "undefined" &&
      (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  let store;
  const sagaMiddleware = createSagaMiddleware();
  if (typeof window !== "undefined" && (<any>window).devToolsExtension) {
    store = createStore(
      rootReducer,
      initialState,
      composeEnhancers(applyMiddleware(sagaMiddleware, createLogger()))
    );
  } else {
    store = createStore(
      rootReducer,
      initialState,
      composeEnhancers(applyMiddleware(sagaMiddleware))
    );
  }

  return { store, runSaga: sagaMiddleware.run };
}
