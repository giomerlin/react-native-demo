import { StyleProp, ViewStyle } from "react-native";
import { Text, useTheme } from "react-native-paper";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
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
  font-size: 20px;
`;

const StyledDetailedText = styled(Text)`
  margin-top: 20px;
`;

const ErrorIcon = styled(AwesomeIcon).attrs({
  size: 80,
  name: "exclamation-circle",
})`
  color: ${({ iconColor }: { iconColor: string }) => iconColor};
`;

const ErrorPanel = ({
  message,
  style,
  detailMessage,
}: {
  message: string;
  detailMessage?: string;
  style?: StyleProp<ViewStyle>;
}) => {
  const { dark, colors } = useTheme();

  const backgroundColor = dark
    ? `rgba( 0, 0, 0, 1 )`
    : `rgba( 255, 255, 255, 1 )`;

  return (
    <Wrapper
      style={[
        style,
        {
          backgroundColor: backgroundColor,
        },
      ]}
    >
      <ErrorIcon iconColor={colors.error} />
      <StyledText>{message}</StyledText>
      {detailMessage && (
        <StyledDetailedText>{detailMessage}</StyledDetailedText>
      )}
    </Wrapper>
  );
};

export default ErrorPanel;
