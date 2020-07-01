import { ToastContext } from "./types";
import { useContext } from "react";

export const useToast = () => {
  const toastHelpers = useContext(ToastContext);

  return toastHelpers;
};
