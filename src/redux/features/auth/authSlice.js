import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/";

//initial state

const collageState = {
  status: "",
  error: "",
  isLoggedIn: false,
};

export const registerCollage = createAsyncThunk(
  "collageAuth/registerCollage",
  async (data, { rejectWithValue }) => {
    try {
      console.log("registering");
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/college/register`,
        data,
        { withCredentials: true }
      );
      const res = req.data;
      localStorage.setItem("auth-token", res.token);
      return res.data;
    } catch (error) {
      console.log("catch");
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const loginCollage = createAsyncThunk(
  "collageAuth/loginCollage",
  async (data, { rejectWithValue }) => {
    try {
      console.log("login");
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/college/login`,
        data,
        { withCredentials: true }
      );
      const res = req.data;
      localStorage.setItem("auth-token", res.token);
      return res.data;
    } catch (error) {
      console.log("catch");
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const  logoutCollage = createAsyncThunk(
  "collageAuth/logoutCollage",
  async (data, { rejectWithValue }) => {
    try {
      console.log("logout");
      const req = await axios.get(
        `${REACT_APP_API_URL}/api/college/logout`,
        { withCredentials: true }
      );
      const res = req.data;
      localStorage.removeItem("auth-token");
      return res.data;
    } catch (error) {
      console.log("catch");
      return rejectWithValue(error.response.data.message);
    }
  }
);


export const googleLoginCollage = createAsyncThunk( 
  "collageAuth/googleLoginCollage",
  async (accessToken, { rejectWithValue }) => {
    try {
      console.log("google login");
      const req = await axios.get(
        `${REACT_APP_API_URL}/api/college/login`,
        {  googleAccessToken: accessToken }
      );
      const res = req.data;
      localStorage.setItem("auth-token", res.token);
      return res.data;
    } catch (error) {
      console.log("catch");
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const googleRegisterCollage = createAsyncThunk(
  "collageAuth/googleRegisterCollage",
  async (accessToken, { rejectWithValue }) => {
    try {
      console.log("google register");
      const req = await axios.get(
        `${REACT_APP_API_URL}/api/college/register`,
        {  googleAccessToken: accessToken }
      );
      const res = req.data;
      localStorage.setItem("auth-token", res.token);
      return res.data;
    } catch (error) {
      console.log("catch");
      return rejectWithValue(error.response.data.message);
    }
  }
);




const collageAuthSlice = createSlice({
  name: "collageAuth",
  initialState: collageState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerCollage.pending, (state, action) => {
        state.status = "loading";
        console.log("pending");
      })
      .addCase(registerCollage.fulfilled, (state, action) => {
        // state.status = action.payload
        state.isLoggedIn = true;

        // Add any fetched posts to the array
        console.log("fullfilled");
      })
      .addCase(registerCollage.rejected, (state, action) => {
        // console.log(action.payload);

        window.alert(action.payload);
      })
      .addCase(loginCollage.pending, (state, action) => {
        state.status = "loading";
        console.log("pending");
      })
      .addCase(loginCollage.fulfilled, (state, action) => {
        // state.status = action.payload
        state.isLoggedIn = true;

        // Add any fetched posts to the array
        console.log("fullfilled");
      })
      .addCase(loginCollage.rejected, (state, action) => {
        // console.log(action.payload);

        window.alert(action.payload);
      });
      
      
  },
});

// export const { todoAdded, todoToggled } = todosSlice.actions;
export default collageAuthSlice.reducer;
