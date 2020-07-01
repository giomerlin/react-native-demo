import React, { useCallback, useContext, useReducer, useRef } from "react";
import styled from "styled-components/native";
import { ToastType } from "./types";
import Toast from "./toast";
import { SafeAreaContext } from "react-native-safe-area-context";

const Wrapper = styled.View`
  position: absolute;
  bottom: ${({ bottom }: { bottom?: number }) => (bottom ? bottom : 0)}px;

  z-index: 1;
  width: 100%;
  background-color: red;
`;

type RefType = {
  ref: React.RefObject<any>;
  exited: boolean;
};

const ToastContainer = ({ toasts }: { toasts: ToastType[] }) => {
  const insets = useContext(SafeAreaContext);
  return (
    <Wrapper bottom={insets?.bottom}>
      {toasts.map((item) => (
        <Toast key={item.id} id={item.id} timeout={item.timeout}>
          {item.content}
        </Toast>
      ))}
    </Wrapper>
  );
};

export default ToastContainer;
