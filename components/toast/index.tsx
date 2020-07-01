import { useContext } from "react";

import { ToastContext, ToastProvider } from "./provider";
import { ToastType } from "./types";

const useToast = () => {
  const toastHelpers = useContext(ToastContext);

  return toastHelpers;
};

export { ToastContext, useToast, ToastType };
export default ToastProvider;
