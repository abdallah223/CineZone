import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export const showToast = (message, type = "success") => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: type,
    title: message,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    background: "#03e1f5",
    color: "#f1f1f1",
    iconColor: "#fff",
  });
};

export const confirmAction = async (
  title = "Are you sure?",
  text = "",
  confirmButtonText = "Yes"
) => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "#f27474",
    background: "#000",
    color: "#fff",
    iconColor: "#f27474",
    confirmButtonText,
    confirmButtonColor: "#0299a6",
  });
  return result.isConfirmed;
};

export const alertWithAsyncActionToast = async (
  asyncAction = () => Promise.resolve(),
  successMessage = "Login successful!",
  errorMessage = "Can not login with this credentials"
) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "info",
    title: "Logging in...",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    background: "#0299a6",
    color: "#f1f1f1",
    iconColor: "#fff",
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const result = await asyncAction();
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: successMessage,
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      background: "#0299a6",
      color: "#f1f1f1",
      iconColor: "#fff",
      allowOutsideClick: true,
    });

    return result;
  } catch (error) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: errorMessage,
      text: error.message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: "#f27474",
      color: "#f1f1f1",
      iconColor: "#fff",
    });
    throw error;
  }
};
