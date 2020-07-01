import React, { useEffect } from "react";
import { Headline } from "react-native-paper";
import { View, StyleProp, ViewStyle } from "react-native";
import styled from "styled-components/native";
import { useDispatch } from "react-redux";

import { resetState } from "../actions";

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
import { RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";

type ThankYouNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ThankYou"
>;

const ThankYou = ({ navigation }: { navigation: ThankYouNavigationProp }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      dispatch(resetState());
    });
    return unsubscribe;
  }, []);

  return (
    <Wrapper>
      <StyledText>Thank You!</StyledText>
    </Wrapper>
  );
};

export default ThankYou;
