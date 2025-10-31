import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";

export type UserFormState = {
  isEdit: boolean;
  editUserId: number | null;
};

const initialState: UserFormState = {
  isEdit: false,
  editUserId: null,
};

export const UserFormSlice = createSlice({
  name: "user-form",
  initialState,
  reducers: {
    setIsEditForm: (state, action: PayloadAction<boolean>) => {
      state.isEdit = action.payload;
    },
    setEditUserId: (state, action: PayloadAction<number>) => {
      state.editUserId = action.payload;
    },
    resetEditForm: (state) => {
      state.editUserId = null;
    },
    resetStateUserForm: () => initialState,
  },
});

export const { setIsEditForm, setEditUserId, resetEditForm, resetStateUserForm } =
  UserFormSlice.actions;

export const selectUserForm = (state: AppState) => state.userForm;

export default UserFormSlice.reducer;
