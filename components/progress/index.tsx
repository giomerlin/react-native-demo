import React, { FunctionComponent, PropsWithChildren } from "react";
import { Dimensions, StyleProp, TextStyle, Text } from "react-native";
import styled from "styled-components/native";
import { ProgressBar, Button, useTheme } from "react-native-paper";
import Animated, { Easing } from "react-native-reanimated";
import { mixColor, useTimingTransition } from "react-native-redash";

type ProggressProps = {
  steps: number;
  currentStep: number;
  onItemClick: (i: number) => void;
};

const Wrapper = styled.View`
  position: relative;
  margin-top: 20px;
`;

const ButtonWrapper = styled.View`
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 20px;
`;

type StyledButtonProps = {
  selected: boolean;
  dark: boolean;
  borderColor: string;
  color: string;
  onPress?: (() => void) | undefined;
  labelStyle?: StyleProp<TextStyle>;
};

const StyledButton = styled(Button).attrs((props: StyledButtonProps) => {
  return {
    compact: true,
    mode: "contained",
  };
})`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  align-items: center;
  text-align: center;
  padding-top: 5px;
  border: 2px;
  border-color: ${({ borderColor }: StyledButtonProps) => borderColor};
`;

const AnymatedStyledButton = Animated.createAnimatedComponent(StyledButton);

const AnymatedBackgrounStyledButton: FunctionComponent<StyledButtonProps> = (
  props: PropsWithChildren<StyledButtonProps>
) => {
  const animateBackground = useTimingTransition(props.selected, {
    duration: 600,
  });
  const { color, ...otherProps } = props;
  const baseColor = props.dark ? "black" : "white";

  return (
    <AnymatedStyledButton
      style={{
        backgroundColor: mixColor(animateBackground, baseColor, color),
      }}
      {...otherProps}
    >
      {props.children}
    </AnymatedStyledButton>
  );
};

const Progress = ({ steps, currentStep, onItemClick }: ProggressProps) => {
  const items = Array.from(Array(steps).keys());
  const { dark, colors } = useTheme();
  const windowWidth = Dimensions.get("window").width;

  let percentage: number = currentStep / (steps - 1);
  let increment = 20.0 / windowWidth;

  return (
    <Wrapper>
      <ProgressBar
        progress={percentage + increment}
        style={{
          position: "absolute",
          top: 22,
        }}
      ></ProgressBar>
      <ButtonWrapper>
        {items.map((item: number) => (
          <AnymatedBackgrounStyledButton
            key={item}
            onPress={() => {
              if (onItemClick) {
                onItemClick(item);
              }
            }}
            labelStyle={{
              fontSize: 15,
            }}
            selected={item <= currentStep - 1}
            dark={dark}
            borderColor={colors.primary}
            color={colors.primary}
          >
            {item}
          </AnymatedBackgrounStyledButton>
        ))}
      </ButtonWrapper>
    </Wrapper>
  );
};

export default Progress;
