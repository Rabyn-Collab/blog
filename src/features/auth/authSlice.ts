import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


type User = {
  id: string;
  token: string;
};

const initialState: { user: User | null } = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    removeUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, removeUser } = authSlice.actions;