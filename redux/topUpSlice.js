import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { transactionApi } from "../api/transactionApi";

// topup
export const doTopup = createAsyncThunk(
  "topup/doTopup",
  async (amount, { rejectWithValue }) => {
    try {
      const response = await transactionApi.topup({
        top_up_amount: amount,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const topupSlice = createSlice({
  name: "topup", 
  initialState: {
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doTopup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(doTopup.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload; 
      })
      .addCase(doTopup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus } = topupSlice.actions;
export default topupSlice.reducer;
