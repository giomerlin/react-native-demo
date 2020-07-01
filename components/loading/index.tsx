import React from "react";
import { ActivityIndicator, Text } from "react-native-paper";
import { View, StyleProp, ViewStyle } from "react-native";
import styled from "styled-components/native";

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled(Text)`
  margin-top: 30px;
`;

const Loading = ({
  title,
  style,
}: {
  title: string;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <Wrapper
      style={[
        style,
        {
          flex: 1,
        },
      ]}
    >
      <ActivityIndicator animating={true} size="large" />
      <StyledText>{title}</StyledText>
    </Wrapper>
  );
};

export default Loading;
