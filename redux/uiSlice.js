import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    showBalance: false,
  },
  reducers: {
    toggleBalance: (state) => {
      state.showBalance = !state.showBalance;
    },
  },
});

export const { toggleBalance } = uiSlice.actions;
export default uiSlice.reducer;
