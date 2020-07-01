import { ToastContext } from "./types";
import { ToastType } from "./types";
import React, {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";
import ToastContainer from "./toastContainer";

let id = 1;

export const ToastProvider: FunctionComponent<unknown> = ({
  children,
}: PropsWithChildren<unknown>) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = useCallback(
    (content: any, timeout = 3000) => {
      setToasts((toasts) => [
        ...toasts,
        {
          id: id++,
          content,
          timeout,
        },
      ]);
    },
    [setToasts]
  );

  const removeToast = useCallback(
    (id) => {
      setToasts((toasts) => toasts.filter((t) => t.id !== id));
    },
    [setToasts]
  );

  return (
    <ToastContext.Provider
      value={{
        addToast,
        removeToast,
      }}
    >
      <ToastContainer toasts={toasts} />
      {children}
    </ToastContext.Provider>
  );
};
