import { toast, ToastPosition, ToastOptions } from "react-toastify";

interface ToastProps {
  message: string;
  position?: ToastPosition;
  type?: "success" | "error" | "warning" | "info";
  theme?: "light" | "colored";
}

export const toastMessage = ({
  message = "Default Toast Message",
  position = "bottom-left",
  theme = "light",
  type,
}: ToastProps) => {
  const options: ToastOptions = {
    position,
    theme,
  };

  if (type) toast[type](message, options);
  else toast(message, options);
};
