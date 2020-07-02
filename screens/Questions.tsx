import * as actions from "../actions";
import { AnswerMap, Question } from "../types/state";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { Title } from "react-native-paper";
import {
  Transition,
  Transitioning,
  TransitioningView,
} from "react-native-reanimated";
import { getAnswers, getQuestions } from "../reducers";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../components/toast";
import Answers from "../components/answers";
import ButtonPanel from "../components/buttonPanel";
import ErrorPanel from "../components/error";
import Loading from "../components/loading";
import PanelHeader from "../components/panelHeader";
import Progress from "../components/progress";
import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import StyledButton from "../components/styledButton";
import styled from "styled-components/native";
import withAnimation from "../hocs/withAnimation";

type RootNavigationProp = StackNavigationProp<RootStackParamList, "Root">;

const QuestionTitle = withAnimation(styled(Title)`
  text-align: center;
  margin-top: 20px;
`);

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
  const [refreshing, setRefreshing] = useState(false);

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
    if (refreshing && Object.keys(questions || {}).length > 0) {
      setRefreshing(false);
    }
  }, [loading, questions, refreshing]);

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(actions.resetState());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.mainView}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        scrollEnabled={questions?.error !== undefined || refreshing}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Transitioning.View
          transition={transition}
          ref={transitionRef as RefObject<TransitioningView>}
          style={styles.fullView}
        >
          {loading ? (
            <>
              {questions?.error ? (
                <ErrorPanel
                  message={questions.error}
                  detailMessage="Pull down to refresh"
                />
              ) : (
                <Loading title="Loading..." />
              )}
            </>
          ) : (
            <View style={styles.fullView}>
              <PanelHeader
                title="Question Wizard"
                subtitle={currentQuestion.subtitle}
              />
              <Progress
                steps={questions?.items?.length || 0}
                currentStep={currentStep}
                onItemClick={(step: number) => setCurrentStep(step)}
              ></Progress>

              <QuestionTitle refKey={`title-${currentQuestion.id}`}>
                {currentQuestion.text}
              </QuestionTitle>

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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullView: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    marginTop: 20,
  },
  scrollView: {
    flex: 1,
    position: "relative",
  },
});

export default Questions;
