import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Assuming axios is used for API calls
import toast from "react-hot-toast";
import getCookie, { clearCookie } from "../../../util/getToken";
import { getHeaders } from "../../../util/isCompany";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const initialState = {
  isAuthenticated: false,
  user: {
    _id: localStorage.getItem("uniId") || null,
  },
  loading: false,
  error: null,
};

export const getUniversity = createAsyncThunk(
  "universityAuth/getUniversity",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/college/me`, {
        withCredentials: true,
        headers: getHeaders().headers,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Thunk for university registration
export const registerUniversity = createAsyncThunk(
  "universityAuth/registerUniversity",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/university/register`,
        data
      );
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
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/university/login`,
        data
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logoutUniversity = createAsyncThunk(
  "universityAuth/logout",
  async (_, { rejectWithValue }) => {
    const token = getCookie("token") || localStorage.getItem("auth-token");
    try {
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/university/logout`,
        {},
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      return req.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

// Thunk for forgot password (if needed)
export const forgotPassword = createAsyncThunk(
  "universityAuth/forgotPassword",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/university/forgot-password`,
        data
      );
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
      localStorage.removeItem("uniId");
      localStorage.removeItem("auth-token");
      clearCookie("token");
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getUniversity.fulfilled, (state, action) => {
        state.user = action.payload.university;
      })
      .addCase(registerUniversity.pending, (state) => {
        state.loading = true;
        state.error = null;
        toast.loading("Registering...");
      })
      .addCase(registerUniversity.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        localStorage.setItem("uniId", action.payload.user._id);
        state.loading = false;
        document.cookie = `token=${action.payload.token}; path=/; max-age=86400;  SameSite=Strict`;
        localStorage.setItem("auth-token", action.payload.token);

        toast.success("Registration successful.");
        if (action.payload.status === "pending") {
          window.location.href = "/university/approval";
        } else {
          window.location.href = "/university/pr/dashboard";
        }
      })
      .addCase(registerUniversity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed.";

        toast.error(action.payload?.message || "Registration failed.");
      })
      .addCase(loginUniversity.pending, (state) => {
        state.loading = true;
        state.error = null;
        // toast.loading("Logging in...");
      })
      .addCase(loginUniversity.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        localStorage.setItem("uniId", action.payload.user._id);
        state.loading = false;
        document.cookie = `token=${action.payload.token}; path=/; max-age=86400;  SameSite=Strict`;
        localStorage.setItem("auth-token", action.payload.token);
        toast.success("Login successful.", {
          id: "university-login",
        });
        window.location.href = "/university/dashboard";

        // if (action.payload.status === "pending") {
        //   window.location.href = "/university/approval";
        // } else {
        //   window.location.href = "/university/pr/dashboard";
        // }
        // window.location.href = "/university/dashboard";
      })
      .addCase(loginUniversity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed.";
        toast.error(action.payload.message || "Login failed.");
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
      })
      .addCase(logoutUniversity.pending, (state, action) => {
        state.status = "loading";
        //console.log("pending");
      })
      .addCase(logoutUniversity.fulfilled, (state, action) => {
        // state.status = action.payload

        state.user = null;
        state.isLoggedIn = false;
        localStorage.clear();
        localStorage.setItem("editable", false);
        clearCookie("token");

        // Add any fetched posts to the array
        //console.log("fullfilled");
      })
      .addCase(logoutUniversity.rejected, (state, action) => {
        //console.log(action.payload);
        // window.alert(action.payload);
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
