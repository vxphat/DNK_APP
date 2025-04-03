import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  user: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; user: string }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
    setUserInfo: (state, action: PayloadAction<{ token?: string; user?: string }>) => {
      if (action.payload.token !== undefined) {
        state.token = action.payload.token;
      }
      if (action.payload.user !== undefined) {
        state.user = action.payload.user;
      }
    },
  },
});

export const { login, logout, setUserInfo } = authSlice.actions;
export default authSlice.reducer;
