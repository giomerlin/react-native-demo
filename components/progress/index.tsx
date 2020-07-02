import { Button, ProgressBar, useTheme } from "react-native-paper";
import { Dimensions, StyleProp, TextStyle } from "react-native";
import { mixColor } from "../../redash/Colors";
import { useTimingTransition } from "../../redash/Transitions";
import Animated from "react-native-reanimated";
import React, { FunctionComponent, PropsWithChildren } from "react";
import styled from "styled-components/native";

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

const StyledButton = styled(Button).attrs({
  compact: true,
  mode: "contained",
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

const AnimatedStyledButton = Animated.createAnimatedComponent(StyledButton);

const AnymatedBackgroundStyledButton: FunctionComponent<StyledButtonProps> = (
  props: PropsWithChildren<StyledButtonProps>
) => {
  const animateBackground = useTimingTransition(props.selected, {
    duration: 600,
  });
  const { color, ...otherProps } = props;
  const baseColor = props.dark ? "black" : "white";

  return (
    <AnimatedStyledButton
      style={{
        backgroundColor: mixColor(animateBackground, baseColor, color),
      }}
      {...otherProps}
    >
      {props.children}
    </AnimatedStyledButton>
  );
};

const Progress = ({ steps, currentStep, onItemClick }: ProggressProps) => {
  const items = Array.from(Array(steps).keys());
  const { dark, colors } = useTheme();
  const windowWidth = Dimensions.get("window").width;

  const percentage: number = currentStep / (steps - 1);
  const increment = 20.0 / windowWidth;

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
          <AnymatedBackgroundStyledButton
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
          </AnymatedBackgroundStyledButton>
        ))}
      </ButtonWrapper>
    </Wrapper>
  );
};

export default Progress;
