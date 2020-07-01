import React, { useEffect, useState, useRef, RefObject } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView, View } from "react-native";
import { Text } from "react-native-paper";

import * as actions from "../actions";
import { getAnswers, getQuestions } from "../reducers";
import Loading from "../components/loading";
import { Question } from "../types/state";

import PanelHeader from "../components/panelHeader";
import Progress from "../components/progress";

import {
  Transition,
  Transitioning,
  TransitioningView,
} from "react-native-reanimated";

const emptyQuestion: Question = {
  id: "",
  answers: [],
};

const Questions = () => {
  const questions = useSelector(getQuestions);
  const answersState = useSelector(getAnswers);
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

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

  const answerMap = answersState?.answerMap || {};

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
  }, [questions]);

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
          </View>
        )}
      </Transitioning.View>
    </SafeAreaView>
  );
};

export default Questions;
