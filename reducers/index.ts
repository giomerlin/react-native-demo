import { combineReducers } from "redux";
import {
  GET_ALL_QUESTIONS,
  RECEIVE_QUESTIONS,
  VALIDATED,
  RECEIVE_ANSWERS_ACK,
  SET_ANSWER,
  POST_ANSWERS,
  AnswersState,
  QuestionsState,
  RootState,
  QuestionActionType,
  AnswerActionType,
} from "../types/state";

export const questionsReducer = (
  state: QuestionsState = {},
  action: QuestionActionType
): QuestionsState => {
  switch (action.type) {
    case GET_ALL_QUESTIONS:
      return {
        ...state,
        loading: true,
        items: [],
      };
    case RECEIVE_QUESTIONS:
      const payload = action.payload;
      return {
        ...state,
        loading: false,
        items: payload.response?.questions || [],
        error: payload.error,
      };

    default:
      return state;
  }
};

export const answersReducer = (
  state: AnswersState = {},
  action: AnswerActionType
): AnswersState => {
  switch (action.type) {
    case SET_ANSWER:
      const currentMap = state.answerMap || {};
      const answerMap = {
        ...currentMap,
        ...action.payload,
      };

      return {
        ...state,
        answerMap: answerMap,
      };
    case VALIDATED:
      return {
        ...state,
        missing: action.payload,
        validated: action.payload.length === 0,
      };
    case POST_ANSWERS:
      return {
        ...state,
        error: undefined,
        loading: true,
        succeded: false,
      };

    case RECEIVE_ANSWERS_ACK:
      return {
        ...state,
        loading: false,
        succeded: !action.payload.error,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export const getQuestions = (state: RootState) => {
  return state.questions;
};

export const getAnswers = (state: RootState) => {
  return state.answers;
};

export const getAnswerMap = (state: RootState) => {
  return state.answers?.answerMap || {};
};

const rootReducer = combineReducers({
  questions: questionsReducer,
  answers: answersReducer,
});

export default rootReducer;
