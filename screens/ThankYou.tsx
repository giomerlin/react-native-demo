import { Headline, useTheme } from "react-native-paper";
import { RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { resetState } from "../actions";
import { useDispatch } from "react-redux";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import React, { useEffect } from "react";
import styled from "styled-components/native";

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const StyledText = styled(Headline)`
  margin-top: 30px;
`;

const ThankYouIcon = styled(AwesomeIcon).attrs({
  size: 80,
  name: "thumbs-up",
})`
  color: ${({ iconColor }: { iconColor: string }) => iconColor};
`;

type ThankYouNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ThankYou"
>;

const ThankYou = ({
  navigation,
}: {
  navigation: ThankYouNavigationProp;
}): JSX.Element => {
  const dispatch = useDispatch();
  const { colors } = useTheme();

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      dispatch(resetState());
    });
    return unsubscribe;
  }, [dispatch, navigation]);

  return (
    <Wrapper>
      <ThankYouIcon iconColor={colors.primary} />
      <StyledText>Thank You!</StyledText>
    </Wrapper>
  );
};

export default ThankYou;
