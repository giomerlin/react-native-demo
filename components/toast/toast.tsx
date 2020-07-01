import { Snackbar } from "react-native-paper";
import { useToast } from "./hooks";
import React, { PropsWithChildren, useState } from "react";
import styled from "styled-components/native";

const StyledSnackBar = styled(Snackbar)``;

type ToastProps = {
  id: number;
  timeout?: number;
  onTimeout?: (id: number) => boolean | undefined;
};

const Toast = ({
  children,
  id,
  timeout = 3000,
  onTimeout,
}: PropsWithChildren<ToastProps>) => {
  const { removeToast } = useToast() || {};
  const [visible, setVisible] = useState(true);

  return (
    <StyledSnackBar
      visible={visible}
      duration={timeout}
      onDismiss={() => {
        if (onTimeout) {
          onTimeout(id);
        }
        setVisible(false);
        removeToast(id);
      }}
    >
      {children}
    </StyledSnackBar>
  );
};

export default Toast;
