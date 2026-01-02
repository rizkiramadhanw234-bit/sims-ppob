import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { transactionApi } from "../api/transactionApi";

export const fetchBalance = createAsyncThunk(
  "balance/fetchBalance",
  async () => {
    const res = await transactionApi.getBalance();
    return res.data.data.balance; 
  }
);

const balanceSlice = createSlice({
  name: "balance",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default balanceSlice.reducer;
