import { Snackbar, Alert } from "@mui/material";

type ToastType = "success" | "error" | "info" | "warning";

type ToastState = {
  open: boolean;
  message: string;
  type: ToastType;
};

type Props = {
  toast: ToastState;
  onClose: () => void;
};

export function Toast({ toast, onClose }: Props) {
  return (
    <Snackbar
      open={toast.open}
      autoHideDuration={2500}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        severity={toast.type}
        variant="filled"
        onClose={onClose} 
        sx={{ width: "100%" }}
      >
        {toast.message}
      </Alert>
    </Snackbar>
  );
}