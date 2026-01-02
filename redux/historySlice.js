import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios"; 

// thunk untuk fetch transaction history
export const fetchTransactionHistory = createAsyncThunk(
  "history/fetchTransactionHistory",
  async ({ offset = 0, limit = 3 }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/transaction/history?offset=${offset}&limit=${limit}`
      );
      if (response.data.status !== 0) {
        return rejectWithValue(
          response.data.message || "Gagal mengambil history"
        );
      }
      return response.data.data.records; // ambil array records aja
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const historySlice = createSlice({
  name: "history",
  initialState: {
    records: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetHistory: (state) => {
      state.records = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(fetchTransactionHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Gagal mengambil history";
      });
  },
});

export const { resetHistory } = historySlice.actions;

export default historySlice.reducer;
