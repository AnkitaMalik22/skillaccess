import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Assuming axios is used for API calls
import toast from "react-hot-toast";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

// Thunk for university registration
export const registerUniversity = createAsyncThunk(
  "universityAuth/registerUniversity",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/api/university/register`, data);
      return response.data; // Assuming the response contains user data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUniversity = createAsyncThunk(
    "universityAuth/loginUniversity",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${REACT_APP_API_URL}/api/university/login`, data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
        }
);

// Thunk for forgot password (if needed)
export const forgotPassword = createAsyncThunk(
  "universityAuth/forgotPassword",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/api/university/forgot-password`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const universityAuthSlice = createSlice({
  name: "universityAuth",
  initialState,
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUniversity.pending, (state) => {
        state.loading = true;
        state.error = null;
        toast.loading("Registering...");
      })
      .addCase(registerUniversity.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
        document.cookie = `token=${action.payload.token}; path=/; max-age=86400;  SameSite=Strict`;

        toast.success("Registration successful.");
        if(action.payload.status === "pending") {
            window.location.href = "/approval";
        }else{
            window.location.href = "/university/pr/dashboard";
        }
      })
      .addCase(registerUniversity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed.";

        toast.error(action.payload || "Registration failed.");
      })
        .addCase(loginUniversity.pending, (state) => {
            state.loading = true;
            state.error = null;
            toast.loading("Logging in...");
        })
        .addCase(loginUniversity.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.loading = false;
            document.cookie = `token=${action.payload.token}; path=/; max-age=86400;  SameSite=Strict`;
            
            toast.success("Login successful.");

            if(action.payload.status === "pending") {
                window.location.href = "/approval";
            }else{
                window.location.href = "/university/pr/dashboard";
            }
            // window.location.href = "/university/dashboard";
        })
        .addCase(loginUniversity.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Login failed.";
            toast.error(action.payload || "Login failed.");
        })
        .addCase(forgotPassword.pending, (state) => {
            state.loading = true;
          })
          .addCase(forgotPassword.fulfilled, (state) => {
            state.loading = false;
            state.error = null; // Handle success if necessary
          })
          .addCase(forgotPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to reset password.";
          });
  },
});

export const { authStart, logout } = universityAuthSlice.actions;
export const selectUniversityData = (state) => state.universityAuth.user;
export const selectLoginState = (state) => ({
  loading: state.universityAuth.loading,
  error: state.universityAuth.error,
});

export default universityAuthSlice.reducer;
