import * as actions from "../actions";
import { api } from "../services";
import configureMockStore from "redux-mock-store";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";

const delay = (t: number) => new Promise((res) => setTimeout(() => res(), t));

const questions = [
  {
    id: "q1",
    text: "This is the first question",
    subtitle: "This is the subtitle",
    answers: [
      { id: 1, text: "Option 1" },
      { id: 2, text: "Option 2" },
      { id: 3, text: "Option 3" },
    ],
  },
];

describe("Test questions", () => {
  it("Should get the questions", async () => {
    const requestQuestions = jest
      .spyOn(api, "getQuestions")
      .mockImplementation(() => Promise.resolve({ response: questions }));

    const sagaMiddleware = createSagaMiddleware();
    const mockStore = configureMockStore([sagaMiddleware])({});
    sagaMiddleware.run(rootSaga);

    await mockStore.dispatch(actions.getAllQuestions());

    await delay(2000);

    expect(requestQuestions).toHaveBeenCalledTimes(1);
    expect(mockStore.getActions()).toEqual([
      { type: "GET_ALL_QUESTIONS" },
      { type: "RECEIVE_QUESTIONS", payload: { response: questions } },
    ]);
  });
});
