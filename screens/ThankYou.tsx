import { Headline } from "react-native-paper";
import { RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { resetState } from "../actions";
import { useDispatch } from "react-redux";
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

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      dispatch(resetState());
    });
    return unsubscribe;
  }, [dispatch, navigation]);

  return (
    <Wrapper>
      <StyledText>Thank You!</StyledText>
    </Wrapper>
  );
};

export default ThankYou;
