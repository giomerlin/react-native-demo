import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducers";
import { RootState } from "../types/state";

export default function configureStore(initialState: RootState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  );

  return { store, runSaga: sagaMiddleware.run };
}
