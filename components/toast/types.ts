import React from "react";

export type ToastType = {
  id: number;
  content: any;
  timeout: number;
};

export type ContextType = {
  addToast: (content: any, timeout?: number) => void;
  removeToast: (id: number) => void;
};

export const ToastContext = React.createContext<ContextType>({} as ContextType);
