import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";

export type UserFormState = {
  isEdit: boolean;
};

const initialState: UserFormState = {
  isEdit: false,
};

export const UserFormSlice = createSlice({
  name: "user-form",
  initialState,
  reducers: {
    setIsEditForm: (state, action: PayloadAction<boolean>) => {
      state.isEdit = action.payload;
    },
    resetStateUserForm: () => initialState,
  },
});

export const { setIsEditForm, resetStateUserForm } = UserFormSlice.actions;

export const selectUserForm = (state: AppState) => state.userForm;

export default UserFormSlice.reducer;
