import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { transactionApi } from "../api/transactionApi";

// pembayaran
export const doPembayaran = createAsyncThunk(
  "transaction/payment",
  async (payload, { rejectWithValue }) => {
    // payload = { service_code, customer_id }
    try {
      const response = await transactionApi.createTransaction(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const pembayaranSlice = createSlice({
  name: "pembayaran",
  initialState: {
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    resetPaymentStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doPembayaran.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(doPembayaran.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(doPembayaran.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPaymentStatus } = pembayaranSlice.actions;
export default pembayaranSlice.reducer;
