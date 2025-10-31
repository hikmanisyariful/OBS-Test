import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";
import type { AlertColor, AlertProps, SnackbarOrigin } from "@mui/material";

export type AlertState = {
  open: boolean;
  message: string;
  severity: AlertColor; // "success" | "info" | "warning" | "error"
  variant: NonNullable<AlertProps["variant"]>; // "filled" | "outlined" | "standard"
  autoHideDuration: number;
  anchorOrigin: SnackbarOrigin; // posisi snackbar
  key?: string | number;
};

type ShowAlertPayload = Partial<
  Pick<AlertState, "message" | "severity" | "variant" | "autoHideDuration" | "anchorOrigin" | "key">
> & { message: string };

const initialState: AlertState = {
  open: false,
  message: "",
  severity: "info",
  variant: "filled",
  autoHideDuration: 3000,
  anchorOrigin: { vertical: "bottom", horizontal: "center" },
};

export const AlertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, { payload }: PayloadAction<ShowAlertPayload>) => {
      state.open = true;
      state.message = payload.message;
      if (payload.severity) state.severity = payload.severity;
      if (payload.variant) state.variant = payload.variant;
      if (payload.autoHideDuration !== undefined) state.autoHideDuration = payload.autoHideDuration;
      if (payload.anchorOrigin) state.anchorOrigin = payload.anchorOrigin;
      if (payload.key !== undefined) state.key = payload.key;
    },
    hideAlert: (state) => {
      state.open = false;
    },
    resetAlert: () => initialState,
  },
});

export const { showAlert, hideAlert, resetAlert } = AlertSlice.actions;

export const selectAlert = (state: AppState) => state.alert;

export default AlertSlice.reducer;
