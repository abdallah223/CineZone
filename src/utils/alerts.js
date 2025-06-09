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

export const confirmAction = async (title = "Are you sure?", text = "") => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "#f27474",
    background: "#000",
    color: "#fff",
    iconColor: "#f27474",
    confirmButtonText: "Delete",
    confirmButtonColor: "#0299a6",
  });
  return result.isConfirmed;
};
