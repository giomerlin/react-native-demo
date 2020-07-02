import { SafeAreaView, View } from "react-native";
import { Text, Title } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import * as actions from "../actions";
import { AnswerMap, Question } from "../types/state";
import { getAnswers, getQuestions } from "../reducers";
import Loading from "../components/loading";

import PanelHeader from "../components/panelHeader";
import Progress from "../components/progress";

import styled from "styled-components/native";

import { StackNavigationProp } from "@react-navigation/stack";
import { useToast } from "../components/toast";
import Answers from "../components/answers";
import ButtonPanel from "../components/buttonPanel";
import StyledButton from "../components/styledButton";

import { RootStackParamList } from "../types";
import {
  Transition,
  Transitioning,
  TransitioningView,
} from "react-native-reanimated";

type RootNavigationProp = StackNavigationProp<RootStackParamList, "Root">;

const QuestionTitle = styled(Title)`
  text-align: center;
  margin-top: 20px;
`;

const emptyQuestion: Question = {
  id: "",
  answers: [],
};
const Questions = ({ navigation }: { navigation: RootNavigationProp }) => {
  const questions = useSelector(getQuestions);
  const answersState = useSelector(getAnswers);
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  /* <Transition.In type="slide-left" durationMs={duration} />
    <Transition.Out type="slide-right" durationMs={duration} />
  */

  const duration = 500;
  const transition = (
    <Transition.Together>
      <Transition.In type="fade" durationMs={duration} />
      <Transition.Out type="fade" durationMs={duration} />
      <Transition.Change interpolation="easeInOut" durationMs={duration} />
    </Transition.Together>
  );

  const transitionRef = useRef<TransitioningView>();

  function startTransition() {
    transitionRef.current?.animateNextTransition();
  }

  const currentQuestion =
    questions?.items && questions?.items.length > currentStep
      ? questions.items[currentStep]
      : emptyQuestion;

  const answers = currentQuestion.answers ? currentQuestion.answers : [];

  const answerMap = answersState?.answerMap || ({} as AnswerMap);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setCurrentStep(0);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    dispatch(actions.getAllQuestions());
  }, [dispatch]);

  useEffect(() => {
    const nextLoading =
      (!questions?.items || questions?.loading || questions?.error) !==
      undefined;
    if (nextLoading !== loading) {
      startTransition();
      setLoading(nextLoading);
    }
  }, [loading, questions]);

  useEffect(() => {
    if (answersState?.succeded === true) {
      navigation.navigate("ThankYou");
    }

    if (answersState?.error) {
      addToast(answersState?.error);
    }
  }, [addToast, answersState, navigation]);

  const onSelectedAnswer = useCallback(
    (id) => {
      const answerMap = {} as AnswerMap;
      answerMap[currentQuestion.id] = parseInt(id);
      dispatch(actions.setAnswer(answerMap));
    },
    [currentQuestion.id, dispatch]
  );

  const previousStep = useCallback(() => {
    setCurrentStep(currentStep - 1);
  }, [currentStep]);

  const nextStep = useCallback(() => {
    if (
      answersState?.validated &&
      currentStep === (questions?.items?.length || 0) - 1
    ) {
      dispatch(actions.postAnswers());
    } else {
      setCurrentStep(currentStep + 1);
    }
  }, [dispatch, answersState?.validated, currentStep, questions?.items]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Transitioning.View
        transition={transition}
        ref={transitionRef as RefObject<TransitioningView>}
        style={{ flex: 1 }}
      >
        {loading ? (
          <>
            {questions?.error ? (
              <Text>{questions.error}</Text>
            ) : (
              <Loading title="Loading..." />
            )}
          </>
        ) : (
          <View style={{ flex: 1 }}>
            <PanelHeader
              title="Question Wizard"
              subtitle={currentQuestion.subtitle}
            />
            <Progress
              steps={questions?.items?.length || 0}
              currentStep={currentStep}
              onItemClick={(step: number) => setCurrentStep(step)}
            ></Progress>

            <QuestionTitle>{currentQuestion.text}</QuestionTitle>

            <Answers
              type="slide-left-right"
              answers={answers}
              onAnswerSelected={onSelectedAnswer}
              selectedAnswer={answerMap[currentQuestion.id]}
            />

            <ButtonPanel>
              <StyledButton onPress={previousStep} visible={currentStep > 0}>
                Previous
              </StyledButton>

              <StyledButton
                onPress={nextStep}
                disabled={
                  (currentStep === (questions?.items?.length || 0) - 1 &&
                    !answersState?.validated) ||
                  !answerMap[currentQuestion.id]
                }
              >
                {currentStep === (questions?.items?.length || 0) - 1
                  ? "Finish"
                  : "Next"}{" "}
              </StyledButton>
            </ButtonPanel>
            {answersState?.loading && (
              <Loading opacity={0.5} title="Posting Quesions" />
            )}
          </View>
        )}
      </Transitioning.View>
    </SafeAreaView>
  );
};

export default Questions;
