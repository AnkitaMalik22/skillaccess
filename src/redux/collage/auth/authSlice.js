import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

console.log(process.env);

//initial state

const collageState = {
  status: "",
  error: "",
  Error: [],
  isLoggedIn: false,
  user: null,
  uploadImg: false,
};

export const registerCollage = createAsyncThunk(
  "collageAuth/registerCollage",
  async (data, { rejectWithValue }) => {
    try {
      console.log("registering");
      console.log(process.env);
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
      console.log(res);
      return res;
    } catch (error) {
      console.log("catch");
      return rejectWithValue(error.response.data);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "collageAuth/forgotPassword",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/college/password/forgot`,
        data,
        { withCredentials: true }
      );
      const res = req.data;

      return res;
    } catch (error) {
      console.log("catch");
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateCollege = createAsyncThunk(
  "collageAuth/updateCollege",
  async (data, { rejectWithValue }) => {
    try {
      console.log("updating", localStorage.getItem("auth-token"));
      const req = await axios.put(
        `${REACT_APP_API_URL}/api/college/update`,
        data,

        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      const res = req.data;
      console.log("should not reject");
      console.log(res);
      return res.data.college;
    } catch (error) {
      console.log("catch", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCollege = createAsyncThunk(
  "collageAuth/getCollege",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/college/me`, {
        withCredentials: true,
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });

      return response.data.college;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAvatar = createAsyncThunk(
  "collageAuth/updateAvatar",
  async (data, { rejectWithValue }) => {
    try {
      console.log("updating", localStorage.getItem("auth-token"));
      const req = await axios.put(
        `${REACT_APP_API_URL}/api/college/update/avatar`,
        data,

        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const res = req.data;
      // console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutCollage = createAsyncThunk(
  "collageAuth/logoutCollage",
  async (_, { rejectWithValue }) => {
    try {
      console.log("logout");
      const req = await axios.get(`${REACT_APP_API_URL}/api/college/logout`, {
        withCredentials: true,
      });
      const res = req.data;
      localStorage.removeItem("auth-token");
      return res.data;
    } catch (error) {
      console.log("catch");
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "collageAuth/updatePassword",

  async (data, { rejectWithValue }) => {
    try {
      console.log("updating", localStorage.getItem("auth-token"));
      const req = await axios.put(
        `${REACT_APP_API_URL}/api/college/password/reset/${data.token}`,
        { password: data.password, confirmPassword: data.confirmPassword },

        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const res = req.data;
      return res;
    } catch (error) {
      console.log("catch", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "collageAuth/updatePassword",

  async (data, { rejectWithValue }) => {
    try {
      console.log("updating", localStorage.getItem("auth-token"));
      const req = await axios.put(
        `${REACT_APP_API_URL}/api/college/password/update`,
        data,

        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const res = req.data;
      return res.data;
    } catch (error) {
      console.log("catch", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const collageAuthSlice = createSlice({
  name: "collageAuth",
  initialState: collageState,
  reducers: {
    setUploadImg: (state, action) => {
      state.uploadImg = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.fulfilled, (state, action) => {})
      .addCase(registerCollage.pending, (state, action) => {
        state.status = "loading";
        console.log("pending");
      })
      .addCase(registerCollage.fulfilled, (state, action) => {
        // state.status = action.payload
        state.isLoggedIn = true;
        state.user = action.payload;
        // Add any fetched posts to the array
        console.log("fullfilled");
      })
      .addCase(registerCollage.rejected, (state, action) => {
        console.log(action.payload);

        // <<<<<<< AnkitaMalik22-ankita-dev
        //   alert(action.payload);
        // =======

        window.alert(action.payload || "invalid credentials");
      })
      .addCase(loginCollage.pending, (state, action) => {
        state.status = "loading";
        console.log("pending");
      })
      .addCase(loginCollage.fulfilled, (state, action) => {
        // state.status = action.payload
        state.status = "done";
        state.isLoggedIn = true;
        state.user = action.payload;

        console.log(state.user);
      })
      .addCase(loginCollage.rejected, (state, action) => {
        state.Error = [action.payload];
      })
      .addCase(updateCollege.pending, (state, action) => {
        // state.status = "loading";
        console.log("pending");
      })
      .addCase(updateCollege.fulfilled, (state, action) => {
        // state.status = action.payload
        state.user = action.payload;
        window.location.reload(true);
        console.log("update college fulfilled");
      })
      .addCase(updateCollege.rejected, (state, action) => {
        // console.log(action.payload);
        // window.alert(action.payload);
        // window.location.reload(true);
        console.log("rejected update profile");
      })
      .addCase(getCollege.pending, (state, action) => {
        // state.status = "loading";
        console.log("pending");
      })
      .addCase(getCollege.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;

        // Add any fetched posts to the array
        console.log("fullfilled get college");
      })
      .addCase(getCollege.rejected, (state, action) => {
        console.log(action.payload);

        // window.alert(action.payload);
      })
      .addCase(updateAvatar.pending, (state, action) => {
        // state.status = "loading";
        console.log("pending avatar");
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        // state.status = action.payload

        state.status = "success";
        console.log(action);
        // state.user = action.payload.college;
        state.uploadImg = true;
        state.user.avatar = action.payload.college.avatar;

        // getCollege();
        // Add any fetched posts to the array
        console.log("fullfilled avatar");
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        console.log("rejected avatar" + action.payload);

        // window.alert(action.payload);
      })
      .addCase(logoutCollage.pending, (state, action) => {
        state.status = "loading";
        console.log("pending");
      })
      .addCase(logoutCollage.fulfilled, (state, action) => {
        // state.status = action.payload

        state.user = null;
        state.isLoggedIn = false;
        localStorage.clear();
        localStorage.setItem("editable", false);
        // Add any fetched posts to the array
        console.log("fullfilled");
      })
      .addCase(logoutCollage.rejected, (state, action) => {
        console.log(action.payload);

        // window.alert(action.payload);
      })
      .addCase(updatePassword.pending, (state, action) => {
        state.status = "loading";
        console.log("pending");
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.status = action.payload;
        alert("Password Updated");
        // state.status = action.payload
        // state.isLoggedIn = false;
        // state.user = action.payload.user;
        // localStorage.removeItem("auth-token");

        // getCollege();
        // localStorage.setItem("auth-token", action.payload.token);
      })
      .addCase(updatePassword.rejected, (state, action) => {
        alert(action.payload.message);
      });
  },
});

//
export const { setUploadImg } = collageAuthSlice.actions;
export default collageAuthSlice.reducer;
