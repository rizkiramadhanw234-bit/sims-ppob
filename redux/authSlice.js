import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";

// Register thunk
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authApi.register({
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        password: userData.password,
      });

      if (response.data.status === 0) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message || "Registrasi gagal");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Terjadi kesalahan saat registrasi"
      );
    }
  }
);

// Login thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);

      if (response.data.status === 0) {
        // Store token - check if window exists
        if (typeof window !== "undefined" && response.data.data?.token) {
          localStorage.setItem("token", response.data.data.token);
        }
        return response.data.data;
      } else {
        return rejectWithValue(response.data.message || "Login gagal");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Terjadi kesalahan saat login"
      );
    }
  }
);

// Check token from localStorage
const getInitialToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: getInitialToken(),
    isLogin: !!getInitialToken(),
    user: null,
    loading: false,
    error: null,
    registerSuccess: false,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isLogin = true;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload);
      }
    },
    logout: (state) => {
      state.token = null;
      state.isLogin = false;
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    clearRegisterSuccess: (state) => {
      state.registerSuccess = false;
    },
    // Initialize from localStorage (call this in useEffect)
    initializeAuth: (state) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        state.token = token;
        state.isLogin = !!token;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registerSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.registerSuccess = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.registerSuccess = false;
      })

      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload?.token;
        state.isLogin = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLogin = false;
      });
  },
});

export const {
  setToken,
  logout,
  clearError,
  clearRegisterSuccess,
  initializeAuth,
} = authSlice.actions;

export default authSlice.reducer;
