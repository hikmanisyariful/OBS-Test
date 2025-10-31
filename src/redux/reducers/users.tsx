import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchState } from "../../interfaces/Fetch";
import { AppState } from "../store";
import { User } from "../../interfaces/User";
import { fetchUsers } from "../../network/users";

export type UsersState = {
  status: FetchState;
  userList: User[];
};

const initialState: UsersState = {
  status: FetchState.IDLE,
  userList: []
};

export const getUsers = createAsyncThunk(
  "users/list",
  async (_, { rejectWithValue, signal }) => {
    try {
      const response: User[] = await fetchUsers(
        signal
      );
      return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (!error.response) throw error;
      return rejectWithValue(error.response);
    }
  }
);

export const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = FetchState.LOADING;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = FetchState.SUCCESS;
        state.userList = action.payload?? [];
      })
      .addCase(getUsers.rejected, (state, action) => {
        if (action.error && action.error.name === "AbortError") return;
        state.status = FetchState.FAILED;
      });
  },
});

// export const {} = UsersSlice.actions;

export const selectUsers = (state: AppState) => state.users;

export default UsersSlice.reducer;
