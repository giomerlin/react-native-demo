import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducers";
import { RootState } from "../types/state";

export default function configureStore(initialState: RootState) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(sagaMiddleware))
  );

  return { store, runSaga: sagaMiddleware.run };
}
