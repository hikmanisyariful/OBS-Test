import { Snackbar, Alert } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { hideAlert } from "../../redux/reducers/alert";

export default function GlobalAlert() {
  const dispatch = useAppDispatch();
  const { open, message, severity, variant, autoHideDuration, anchorOrigin } = useAppSelector(
    (state) => state.alert
  );

  return (
    <Snackbar
      open={open}
      onClose={(_e, reason) => {
        if (reason !== "clickaway") dispatch(hideAlert());
      }}
      autoHideDuration={autoHideDuration}
      anchorOrigin={anchorOrigin}
    >
      <Alert
        onClose={() => dispatch(hideAlert())}
        severity={severity}
        variant={variant}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
