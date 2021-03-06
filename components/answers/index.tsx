import { Answer } from "../../types/state";
import { RadioButton } from "react-native-paper";
import { View } from "react-native";
import React from "react";
import withAnimation from "../../hocs/withAnimation";

type AnswersProps = {
  answers: Answer[];
  selectedAnswer?: number;
  onAnswerSelected?: (index: number) => void;
};

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

export default withAnimation(Answers);
