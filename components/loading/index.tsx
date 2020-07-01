import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import { StyleProp, ViewStyle } from "react-native";
import React from "react";
import styled from "styled-components/native";

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const StyledText = styled(Text)`
  margin-top: 30px;
`;

const Loading = ({
  title,
  style,
  opacity = 1,
}: {
  title: string;
  style?: StyleProp<ViewStyle>;
  opacity?: number;
}) => {
  const { dark } = useTheme();

  const backgroundColor = dark
    ? `rgba( 0, 0, 0, ${opacity} )`
    : `rgba( 255, 255, 255, ${opacity} )`;

  return (
    <Wrapper
      style={[
        style,
        {
          backgroundColor: backgroundColor,
        },
      ]}
    >
      <ActivityIndicator animating={true} size="large" />
      <StyledText>{title}</StyledText>
    </Wrapper>
  );
};

export default Loading;
