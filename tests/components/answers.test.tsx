import "@testing-library/jest-native/extend-expect";
import { cleanup, fireEvent, render } from "react-native-testing-library";
import Answers from "../../components/answers";
import React, { useState } from "react";

const answers = [
  { id: 0, text: "This is a test" },
  { id: 1, text: "This is another test" },
];

describe("Test answer controll", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders answers with out callbacks", async () => {
    const element = render(<Answers answers={answers} />);

    fireEvent.press(element.getByText("This is another test"));

    const buttons = element.getAllByA11yRole("button");
    expect(
      buttons.filter(
        (b) => b.props["accessibilityComponentType"] !== "radiobutton_unchecked"
      )
    ).toEqual([]);
  });

  it("renders answers read only", () => {
    const element = render(
      <Answers
        answers={answers}
        selectedAnswer={0}
        onAnswerSelected={() => {}}
      />
    );

    fireEvent.press(element.getByText("This is another test"));

    const buttons = element.getAllByA11yRole("button");

    expect(
      buttons.filter(
        (b) => b.props["accessibilityComponentType"] !== "radiobutton_unchecked"
      )
    ).toEqual([]);
  });

  it("renders answers read with callback", async () => {
    const TestingComponent = () => {
      const [answer, setAnswer] = useState(-1);
      return (
        <Answers
          answers={answers}
          selectedAnswer={answer}
          onAnswerSelected={(index) => setAnswer(index)}
        />
      );
    };

    const element = render(<TestingComponent />);

    fireEvent.press(element.getByText("This is another test"));

    const buttons = element.getAllByA11yRole("button");

    expect(
      buttons.filter(
        (b) => b.props["accessibilityComponentType"] !== "radiobutton_unchecked"
      ).length
    ).toBe(1);
  });
});
