import {
  GET_ALL_QUESTIONS,
  POST_ANSWERS,
  SET_ANSWER,
  GetAllQuestionsAction,
  PostAnswerAction,
  AnswerMap,
  RESET_STATE,
  RECEIVE_QUESTIONS,
  SetAnswerAction,
  ReceiveQuestionsAction,
  ValidatedAnswerAction,
  ResetStateAction,
  VALIDATED,
  RECEIVE_ANSWERS_ACK,
  ReceiveAnswerAckAction,
} from "../types/state";

export const getAllQuestions = (): GetAllQuestionsAction => {
  return {
    type: GET_ALL_QUESTIONS,
  };
};

export const postAnswers = (): PostAnswerAction => {
  return {
    type: POST_ANSWERS,
  };
};

export const setAnswer = (answerMap: AnswerMap): SetAnswerAction => {
  return { type: SET_ANSWER, payload: answerMap };
};

export const receiveQuestions = (questions: any): ReceiveQuestionsAction => {
  return { type: RECEIVE_QUESTIONS, payload: questions };
};

export const answersValidated = (missing: number[]): ValidatedAnswerAction => {
  return { type: VALIDATED, payload: missing };
};

export const recieveAnswersAck = (response: any): ReceiveAnswerAckAction => {
  return { type: RECEIVE_ANSWERS_ACK, payload: response };
};

export const resetState = (): ResetStateAction => {
  return { type: RESET_STATE };
};
