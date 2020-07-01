import React, { FunctionComponent, useCallback, useState } from "react";
import ToastContainer from "./toastContainer";
import { ToastType } from "./types";

type ContextType = {
  addToast: (content: any, timeout?: number) => void;
  removeToast: (id: number) => void;
};

export const ToastContext = React.createContext<ContextType>({} as ContextType);

let id = 1;

export const ToastProvider: FunctionComponent = ({ children }) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = useCallback(
    (content: any, timeout: number = 3000) => {
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
