import { Id, toast } from "react-toastify";

export const successToeast = (toastId: Id, message: string) => {
  return toast.update(toastId, {
    render: message,
    autoClose: 4000,
    isLoading: false,
    type: "success",
  });
};

export const errorToeast = (toastId: Id, message: string) => {
  return toast.update(toastId, {
    render: message,
    autoClose: 4000,
    isLoading: false,
    type: "error",
  });
};
