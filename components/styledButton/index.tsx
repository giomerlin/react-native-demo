import React from "react";
import { View, ViewProps } from "react-native";
import styled from "styled-components/native";
import { Button } from "react-native-paper";
import Animated, { Easing } from "react-native-reanimated";
import { useTimingTransition } from "react-native-redash";

type ToggleVisibilityButtonProps = typeof Button.defaultProps & {
  visible?: boolean;
};

const StyledButton = styled(Button).attrs(
  ({ visible }: ToggleVisibilityButtonProps) =>
    visible === false
      ? {
          mode: "contained",
          compact: true,
          disabled: true,
        }
      : { mode: "contained", compact: true }
)`
  min-width: 70px;
`;

const AnimatedStyledButton = Animated.createAnimatedComponent(StyledButton);

const ToggleVisibilityButton = (props: ToggleVisibilityButtonProps) => {
  const opacityValue = useTimingTransition(props.visible !== false, {
    duration: 300,
  });

  return (
    <AnimatedStyledButton
      {...props}
      style={{
        opacity: opacityValue,
      }}
    />
  );
};

export default ToggleVisibilityButton;
