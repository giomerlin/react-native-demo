export type Answer = {
  id: number;
  text: string;
};

export type Question = {
  id: string;
  text?: string;
  subtitle?: string;
  answers: Answer[];
};

export type AnswerMap = Record<string, number>;

export type QuestionsState = {
  loading?: boolean;
  items?: Question[];
  error?: any;
};

export const GET_ALL_QUESTIONS = "GET_ALL_QUESTIONS";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";

export type GetAllQuestionsAction = {
  type: typeof GET_ALL_QUESTIONS;
};

export type ReceiveQuestionsAction = {
  type: typeof RECEIVE_QUESTIONS;
  //TODO: Use the right type
  payload: any;
};

export type QuestionActionType = GetAllQuestionsAction | ReceiveQuestionsAction;

export const SET_ANSWER = "SET_ANSWER";
export const VALIDATE_ANSWERS = "VALIDATE_ANSWERS";
export const VALIDATED = "VALIDATED";
export const POST_ANSWERS = "POST_ANSWERS";
export const RECEIVE_ANSWERS_ACK = "RECEIVE_ANSWERS_ACK";

export type AnswersState = {
  answerMap?: AnswerMap;
  missing?: number[];
  validated?: boolean;
  loading?: boolean;
  succeded?: boolean;
  error?: any;
};

export type SetAnswerAction = {
  type: typeof SET_ANSWER;
  payload: AnswerMap;
};

export type ValidateAnswerAction = {
  type: typeof VALIDATE_ANSWERS;
};

export type ValidatedAnswerAction = {
  type: typeof VALIDATED;
  payload: number[];
};

export type PostAnswerAction = {
  type: typeof POST_ANSWERS;
};

export type ReceiveAnswerAckAction = {
  type: typeof RECEIVE_ANSWERS_ACK;
  payload: {
    error: any;
  };
};

export type AnswerActionType =
  | SetAnswerAction
  | ValidateAnswerAction
  | ValidatedAnswerAction
  | PostAnswerAction
  | ReceiveAnswerAckAction;

export type RootState = {
  questions?: QuestionsState;
  answers?: AnswersState;
};
