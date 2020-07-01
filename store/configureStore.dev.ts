import { RootState } from "../types/state";
import { applyMiddleware, compose, createStore } from "redux";

import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducers";

export default function configureStore(initialState: RootState) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(sagaMiddleware))
  );

  return { store, runSaga: sagaMiddleware.run };
}
