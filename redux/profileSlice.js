import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";

// fetch profile
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async () => {
    const res = await authApi.getProfile();
    return res.data.data;
  }
);

// update profile (nama, email)
export const updateProfileApi = createAsyncThunk(
  "profile/updateProfile",
  async (payload) => {
    const res = await authApi.updateProfile(payload);
    return res.data.data;
  }
);

// update profile image
export const updateImage = createAsyncThunk(
  "profile/updateImage",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await authApi.updateImage(formData);

      // Check API response status
      if (res.data.status !== 0) {
        return rejectWithValue(res.data.message || "Upload failed");
      }

      return res.data.data; 
    } catch (error) {
      console.error("Upload error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Gagal upload foto"
      );
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: null,
    loading: false,
    updating: false,
    error: null,
  },
  reducers: {
    resetProfile: (state) => {
      state.data = null;
      state.loading = false;
      state.updating = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      // update profile
      .addCase(updateProfileApi.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateProfileApi.fulfilled, (state, action) => {
        state.data = action.payload;
        state.updating = false;
      })
      .addCase(updateProfileApi.rejected, (state, action) => {
        state.error = action.error.message;
        state.updating = false;
      })
      // update image
      .addCase(updateImage.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateImage.fulfilled, (state, action) => {
        // Merge the updated image data with existing profile data
        state.data = { ...state.data, ...action.payload };
        state.updating = false;
      })
      .addCase(updateImage.rejected, (state, action) => {
        state.error = action.error.message;
        state.updating = false;
      });
  },
});

export const { resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
