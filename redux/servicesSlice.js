import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { servicesApi } from "../api/services";

export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async () => {
    const res = await servicesApi.getServices();
    return res.data.data;
  }
);

const servicesSlice = createSlice({
  name: "services",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default servicesSlice.reducer;
