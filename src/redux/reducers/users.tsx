import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  userList: [],
};

export const getUsers = createAsyncThunk("users/list", async (_, { rejectWithValue, signal }) => {
  try {
    const response: User[] = await fetchUsers(signal);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (!error.response) throw error;
    return rejectWithValue(error.response);
  }
});

export const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const newUser = action.payload as User;

      // pastikan id unik
      const newId =
        newUser.id ??
        (state.userList.length ? Math.max(...state.userList.map((u) => u.id)) + 1 : 1);

      state.userList.push({ ...newUser, id: newId });
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const updatedUser = action.payload as User;
      const index = state.userList.findIndex((u) => u.id === updatedUser.id);
      if (index !== -1) {
        state.userList[index] = { ...state.userList[index], ...updatedUser };
      }
    },
    deleteUserById: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.userList = state.userList.filter((u) => u.id !== id);
    },
    deleteUsersByIds: (state, action: PayloadAction<number[]>) => {
      const ids = new Set(action.payload);
      state.userList = state.userList.filter((u) => !ids.has(u.id));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = FetchState.LOADING;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = FetchState.SUCCESS;
        state.userList = action.payload ?? [];
      })
      .addCase(getUsers.rejected, (state, action) => {
        if (action.error && action.error.name === "AbortError") return;
        state.status = FetchState.FAILED;
      });
  },
});

export const { updateUser, addUser, deleteUserById, deleteUsersByIds } = UsersSlice.actions;

export const selectUsers = (state: AppState) => state.users;

export default UsersSlice.reducer;
