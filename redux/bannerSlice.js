import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { bannerApi } from "../api/bannerApi";

export const fetchBanner = createAsyncThunk(
  "banner/fetchBanner",
  async () => {
    const res = await bannerApi.getBanner();
    return res.data.data; 
  }
);

const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default bannerSlice.reducer;
