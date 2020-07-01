import * as actions from "../actions";
import {
  GET_ALL_QUESTIONS,
  POST_ANSWERS,
  RESET_STATE,
  SET_ANSWER,
} from "../types/state";
import {
  all,
  call,
  delay,
  fork,
  put,
  select,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import { api } from "../services";
import { getAnswerMap, getQuestions } from "../reducers";

export function* getAllQuestions() {
  const questions = yield call(api.getQuestions);
  yield delay(2000);
  yield put(actions.receiveQuestions(questions));
}

export function* validateAnswers() {
  const answersMap = yield select(getAnswerMap);
  const questions = yield select(getQuestions);
  if (questions.items && questions.items.length > 0) {
    const missing = questions.items
      .filter((q: any) => !answersMap[q.id])
      .map((q: any) => q.id);
    yield put(actions.answersValidated(missing));
  }
}

export function* postAnswers() {
  const answersMap = yield select(getAnswerMap);
  const response = yield call(api.postAnswers, answersMap);
  yield delay(1500);
  yield put(actions.recieveAnswersAck(response));
}

export function* watchGetQuestions() {
  yield takeLatest(GET_ALL_QUESTIONS, getAllQuestions);
}

export function* watchPostAnswers() {
  yield takeEvery(POST_ANSWERS, postAnswers);
}

export function* watchSetAnswer() {
  yield takeEvery(SET_ANSWER, validateAnswers);
}

export function* watchResetState() {
  yield takeEvery(RESET_STATE, getAllQuestions);
}

export default function* root() {
  yield all([
    fork(watchGetQuestions),
    fork(watchSetAnswer),
    fork(watchPostAnswers),
    fork(watchResetState),
  ]);
}
