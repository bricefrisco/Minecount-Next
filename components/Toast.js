import { Alert, Snackbar } from "@mui/material";

const Toast = ({ variant, message, open, handleClose }) => {
  console.log("open: " + open);
  const onClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    handleClose();
  };

  console.log(open);
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={variant} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
