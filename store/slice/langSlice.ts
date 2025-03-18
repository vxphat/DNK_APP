import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  language: string | null;
}

const initialState: AuthState = {
    language: 'vi',
};

const langSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<{ language: string; }>) => {
      state.language = action.payload.language;
    },
  },
});

export const { changeLanguage } = langSlice.actions;
export default langSlice.reducer;
