import {
  Transition,
  Transitioning,
  TransitioningView,
} from "react-native-reanimated";
import React, { RefObject } from "react";
import isEqual from "react-fast-compare";

interface WithAnimationProps {
  type?: "fade" | "scale" | "slide-left-right" | "slide-right-left";
  duration?: number;
  refKey?: string | number;
}

type OriginalTransitionType =
  | "fade"
  | "scale"
  | "slide-top"
  | "slide-bottom"
  | "slide-right"
  | "slide-left";

interface WithAnimationState {
  transition?: JSX.Element;
}
// eslint-disable-next-line @typescript-eslint/ban-types
const withAnimation = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  class ComponentWithAnimation extends React.Component<
    P & WithAnimationProps,
    WithAnimationState
  > {
    private transitionRef: RefObject<TransitioningView>;

    constructor(props: P & WithAnimationProps) {
      super(props);

      this.transitionRef = React.createRef<TransitioningView>();
      this.state = {
        transition: <Transition.In></Transition.In>,
      };
    }

    getSnapshotBeforeUpdate(props: P & WithAnimationProps) {
      if (!isEqual(props, this.props)) {
        this.transitionRef.current?.animateNextTransition();
      }

      return null;
    }
    // eslint-disable-next-line no-empty
    componentDidUpdate() {}

    static getDerivedStateFromProps(props: P & WithAnimationProps) {
      const { duration, type } = props;
      let inType: OriginalTransitionType = "fade";
      let outType: OriginalTransitionType = "fade";
      switch (type) {
        case "slide-left-right":
          inType = "slide-left";
          outType = "slide-right";
          break;
        case "slide-right-left":
          inType = "slide-right";
          outType = "slide-left";
          break;
        case "fade":
          inType = "fade";
          outType = "fade";
          break;
        case "scale":
          inType = "scale";
          outType = "scale";
          break;
      }

      return {
        transition: (
          <Transition.Together>
            <Transition.In type={inType} durationMs={duration} />
            <Transition.Out type={outType} durationMs={duration} />
            <Transition.Change
              interpolation="easeInOut"
              durationMs={duration}
            />
          </Transition.Together>
        ),
      };
    }

    render() {
      const { refKey, ...props } = this.props;

      return (
        <Transitioning.View
          transition={this.state.transition}
          ref={this.transitionRef}
        >
          <WrappedComponent key={refKey} {...(props as P)}></WrappedComponent>
        </Transitioning.View>
      );
    }
  }
  return ComponentWithAnimation;
};

export default withAnimation;
