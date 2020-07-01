import React from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import { Answer } from "../../types/state";
import { RadioButton } from "react-native-paper";

type AnswersProps = {
  answers: Answer[];
  selectedAnswer?: number;
  onAnswerSelected?: (index: number) => void;
};

const RadioWrapperView = styled.View`
  flex-direction: row;
  margin: 5px 20px;
`;

const RadioButtonWrapper = ({ answer }: { answer: Answer }) => {
  return <RadioButton.Item label={answer.text} value={answer.id.toString()} />;
};

const Answers = ({
  answers,
  onAnswerSelected,
  selectedAnswer,
}: AnswersProps) => {
  const currentAnswer = selectedAnswer ? selectedAnswer.toString() : "";

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <RadioButton.Group
        value={currentAnswer}
        onValueChange={(value) => {
          if (onAnswerSelected) {
            onAnswerSelected(parseInt(value));
          }
        }}
      >
        {answers.map((a) => (
          <RadioButtonWrapper answer={a} key={a.id} />
        ))}
      </RadioButton.Group>
    </View>
  );
};

export default Answers;
