import React, {
  FunctionComponent,
  PropsWithChildren,
  useRef,
  useEffect,
} from "react";
import { Dimensions, StyleProp, TextStyle, Text } from "react-native";
import styled from "styled-components/native";
import { ProgressBar, Button, useTheme } from "react-native-paper";
import Animated, { Easing } from "react-native-reanimated";
import { mixColor } from "react-native-redash";

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
  background-color: ${({ color, borderColor }: StyledButtonProps) =>
    color ? color : borderColor};
`;

const AnymatedStyledButton = Animated.createAnimatedComponent(StyledButton);

const AnymatedBackgrounStyledButton: FunctionComponent<StyledButtonProps> = (
  props: PropsWithChildren<StyledButtonProps>
) => {
  const animateBackground = useRef(new Animated.Value(0.0));
  const baseColor = props.dark ? "black" : "white";
  const { color, ...otherProps } = props;

  const colorRefAnim = useRef(
    Animated.timing(animateBackground.current, {
      duration: 600,
      toValue: 0.0,
      easing: Easing.inOut(Easing.ease),
    })
  );

  useEffect(() => {
    const startValue = props.selected
      ? new Animated.Value(0)
      : new Animated.Value(1);
    Animated.set(animateBackground.current, startValue);

    colorRefAnim.current = Animated.timing(animateBackground.current, {
      duration: 600,
      toValue: props.selected ? 1 : 0,
      easing: Easing.inOut(Easing.ease),
    });
    colorRefAnim.current.start();
  }, [props.selected, color, baseColor]);

  return (
    <AnymatedStyledButton
      style={{
        backgroundColor: mixColor(animateBackground.current, baseColor, color),
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
