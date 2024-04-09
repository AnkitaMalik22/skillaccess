import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getIp from "./getIp";
import toast from "react-hot-toast";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
// const REACT_APP_API_URL = "http://localhost:4000";

// console.log(process.env);

//initial state

const studentState = {
  qr: {
    secret: "",
    code: "",
  },
  status: "",
  error: "",
  Error: [],
  isLoggedIn: false,
  user: null,
  uploadImg: false,
  loggedInUsers: null,
  logoutError: null,
};

export const getSecretQr = createAsyncThunk(
  "studentAuth/getSecretQr",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.get(
        `${REACT_APP_API_URL}/api/student/2fa/getSecretQr`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const res = req.data;

      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const selectAuth = createAsyncThunk(
  "studentAuth/selectAuth",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/student/selectAuth`,
        { type: data.type },
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
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const verifyQr = createAsyncThunk(
  "studentAuth/verifyQr",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/student/2fa/verifyQr`,
        { secret: data.secret, token: data.token },
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
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const registerStudent = createAsyncThunk(
  "studentAuth/registerStudent",
  async (data, { rejectWithValue }) => {
    try {
      const ip = await getIp();
      console.log("registering", ip);
      // console.log(process.env);
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/student/register?CollegeId=${data.CollegeId}&inviteLink=${data.inviteLink}`,
        { ...data, ip },
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
export const loginStudent = createAsyncThunk(
  "studentAuth/loginStudent",
  async (data, { rejectWithValue }) => {
    try {
      const ip = await getIp();
      console.log("login", ip);
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/student/login`,
        { ...data, ip },
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
  "studentAuth/forgotPassword",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/student/password/forgot`,
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
  "studentAuth/updateCollege",
  async (data, { rejectWithValue }) => {
    try {
      console.log("updating", localStorage.getItem("auth-token"));
      const req = await axios.put(
        `${REACT_APP_API_URL}/api/student/update`,
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

export const getStudent = createAsyncThunk(
  "studentAuth/getStudent",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/student/me`, {
        withCredentials: true,
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });

      return response.data.student;
      console.log(response.data.student);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAvatar = createAsyncThunk(
  "studentAuth/updateAvatar",
  async (data, { rejectWithValue }) => {
    try {
      console.log("updating", localStorage.getItem("auth-token"));
      const req = await axios.put(
        `${REACT_APP_API_URL}/api/student/update/avatar`,
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
  "studentAuth/logoutCollage",
  async (_, { rejectWithValue }) => {
    try {
      console.log("logout");
      const req = await axios.get(`${REACT_APP_API_URL}/api/student/logout`, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
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
  "studentAuth/resetPassword",

  async (data, { rejectWithValue }) => {
    try {
      const ip = await getIp();
      console.log("updating", localStorage.getItem("auth-token"));
      const req = await axios.put(
        `${REACT_APP_API_URL}/api/student/password/reset/${data.token}`,
        { password: data.password, confirmPassword: data.confirmPassword, ip },

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
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "studentAuth/updatePassword",

  async (data, { rejectWithValue }) => {
    try {
      const ip = await getIp();

      console.log("updating", localStorage.getItem("auth-token"));
      const req = await axios.put(
        `${REACT_APP_API_URL}/api/student/password/update`,
        { ...data, ip },

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
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const googleLoginStudent = createAsyncThunk(
  "studentAuth/googleLoginStudent",
  async (accessToken, { rejectWithValue }) => {
    try {
      const ip = await getIp();
      console.log("google login");
      const req = await axios.post(`${REACT_APP_API_URL}/api/student/login`, {
        googleAccessToken: accessToken,
        ip,
      });
      const res = req.data;
      localStorage.setItem("auth-token", res.token);
      return res;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const googleRegisterStudent = createAsyncThunk(
  "studentAuth/googleRegisterStudent",
  async ({accessToken,collegeId ,inviteLink}, { rejectWithValue }) => {
    try {
      const ip = await getIp();
      console.log("google register");
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/student/register?CollegeId=${collegeId}&inviteLink=${inviteLink}`,
        { googleAccessToken: accessToken, ip: ip }
      );
      const res = req.data;
      console.log(res, "res.data");
      localStorage.setItem("auth-token", res.token);
      return res;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getLoggedInUsers = createAsyncThunk(
  "studentAuth/getLoggedInUsers",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.get(
        `${REACT_APP_API_URL}/api/student/loggedin/users`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
          withCredentials: true,
        }
      );
      const res = req.data;
      return res.loggedInUsers;
    } catch (error) {
      console.log("catch");
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutAUser = createAsyncThunk(
  "studentAuth/logoutAUser",
  async (token, { rejectWithValue }) => {
    try {
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/student/logout/user/${token}`,
        {},
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
          withCredentials: true,
        }
      );
      const res = req.data;
      return res.loggedInUsers;
    } catch (error) {
      console.log("catch");
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeLoggedOutUser = createAsyncThunk(
  "studentAuth/removeLoggedOutUser",
  async (token, { rejectWithValue }) => {
    try {
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/student/remove/logout/user/${token}`,
        {},
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
          withCredentials: true,
        }
      );
      const res = req.data;
      return res.loggedInUsers;
    } catch (error) {
      console.log("catch");
      return rejectWithValue(error.response.data);
    }
  }
);

const studentAuthSlice = createSlice({
  name: "collageAuth",
  initialState: studentState,
  reducers: {
    setUploadImg: (state, action) => {
      state.uploadImg = action.payload;
    },
    clearLogoutError: (state, action) => {
      state.logoutError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectAuth.fulfilled, (state, action) => {
        switch (action.payload.college.authType) {
          case "otp":
            toast.success("authentication switched to text message");
            break;
          case "qr":
            toast.success("authentication switched to auth-app");
            break;
          default:
            toast.success("authentication switched to default");
            break;
        }
      })
      .addCase(verifyQr.fulfilled, (state, action) => {
        toast.success("verified");
        window.location.href = "/collage/dashboard";
      })
      .addCase(verifyQr.rejected, (state, action) => {
        toast.error("invalid token");
      })
      .addCase(getSecretQr.fulfilled, (state, action) => {
        state.qr.secret = action.payload.secret.ascii;
        state.qr.code = action.payload.qr;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {})
      .addCase(registerStudent.pending, (state, action) => {
        state.status = "loading";
        console.log("pending");
      })
      .addCase(registerStudent.fulfilled, (state, action) => {
        // state.status = action.payload
        state.isLoggedIn = true;
        state.user = action.payload;
        // Add any fetched posts to the array
        console.log("fullfilled");
      })
      .addCase(registerStudent.rejected, (state, action) => {
        console.log(action.payload);

        // <<<<<<< AnkitaMalik22-ankita-dev
        //   alert(action.payload);
        // =======

        toast.error(action.payload || "invalid credentials");
      })
      .addCase(loginStudent.pending, (state, action) => {
        state.status = "loading";
        console.log("pending");
      })
      .addCase(loginStudent.fulfilled, (state, action) => {
        // state.status = action.payload
        const { user } = action.payload;
        state.user = user;
        switch (user.authType) {
          case "qr":
            window.location.href = "/student/settings/security/securityApp";
            break;
          case "otp":
            window.location.href = "/student/settings/security/secondFA";
            break;
          default:
            state.status = "done";
            state.isLoggedIn = true;
            window.location.href = "/student/dash";
            break;
        }
      })
      .addCase(loginStudent.rejected, (state, action) => {
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
      .addCase(getStudent.pending, (state, action) => {
        // state.status = "loading";
        console.log("pending");
      })
      .addCase(getStudent.fulfilled, (state, action) => {

        console.log(action.payload);
        state.isLoggedIn = true;
        state.user = action.payload;

        // Add any fetched posts to the array
        console.log("fullfilled get college");
      })
      .addCase(getStudent.rejected, (state, action) => {
        // state.logoutError = action.payload;
        state.isLoggedIn = false;
        // alert("You are logged out! Please login again");

        if (
          action.payload.message == "Token is blacklisted. Please login again"
        ) {
          localStorage.removeItem("auth-token");
          state.loggedInUsers = null;
          state.logoutError = action.payload;
        }

        console.log(action.payload.message);

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

        // getStudent();
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
        toast.success("Password Updated");
        // state.status = action.payload
        // state.isLoggedIn = false;
        // state.user = action.payload.user;
        // localStorage.removeItem("auth-token");

        // getStudent();
        // localStorage.setItem("auth-token", action.payload.token);
      })
      .addCase(updatePassword.rejected, (state, action) => {
        alert(action.payload.message);
      })
      .addCase(googleLoginStudent.pending, (state, action) => {
        state.status = "loading";
        console.log("pending google login");
      })
      .addCase(googleLoginStudent.fulfilled, (state, action) => {
        console.log("fuillfilled google login");
        state.user = action.payload.user;
        state.status = action.payload;
        localStorage.setItem("auth-token", action.payload.token);
        switch (state.user.authType) {
          case "qr":
            window.location.href = "/student/settings/security/securityApp";
            break;
          case "otp":
            window.location.href = "/student/settings/security/secondFA";
            break;
          default:
            state.status = "done";
            state.isLoggedIn = true;
            window.location.href = "/student/profile";
            break;
        }
      })
      .addCase(googleLoginStudent.rejected, (state, action) => {
        // console.log(action.payload);
        toast.error(action.payload);
        // window.alert(action.payload);
        window.location.href = "/student";
      })
      .addCase(googleRegisterStudent.pending, (state, action) => {
        state.status = "loading";
        console.log("pending");
      })
      .addCase(googleRegisterStudent.fulfilled, (state, action) => {
        state.status = action.payload;
        state.isLoggedIn = true;
        state.user = action.payload.user;
        localStorage.setItem("auth-token", action.payload.token);
        window.location.href = "/student/profile";
        // Add any fetched posts to the array
        console.log("fullfilled");
      })
      .addCase(googleRegisterStudent.rejected, (state, action) => {
        // console.log(action.payload);

        state.error = action.payload;
        toast.error(action.payload);

        // window.alert(action.payload);
        window.location.href = "/student";
      })
      .addCase(getLoggedInUsers.pending, (state, action) => {
        state.status = "loading";
        console.log("pending");
      })
      .addCase(getLoggedInUsers.fulfilled, (state, action) => {
        state.status = "success";
        state.loggedInUsers = action.payload;
        // Add any fetched posts to the array
        console.log("fullfilled");
      })
      .addCase(getLoggedInUsers.rejected, (state, action) => {
        console.log(action.payload);
        window.alert(action.payload);
      })
      .addCase(logoutAUser.pending, (state, action) => {
        state.status = "loading";
        console.log("pending");
      })
      .addCase(logoutAUser.fulfilled, (state, action) => {
        state.status = "success";
        // state.user = action.payload;
        state.loggedInUsers = action.payload;
        console.log("fullfilled");
      })
      .addCase(logoutAUser.rejected, (state, action) => {
        console.log(action.payload);

        window.alert(action.payload);
      })
      .addCase(removeLoggedOutUser.pending, (state, action) => {
        state.status = "loading";
        console.log("pending");
      })
      .addCase(removeLoggedOutUser.fulfilled, (state, action) => {
        state.status = "success";
        // state.user = action.payload;
        state.loggedInUsers = action.payload;
        console.log("fullfilled");
      })
      .addCase(removeLoggedOutUser.rejected, (state, action) => {
        console.log(action.payload);
        // getLoggedInUsers();
        if (state.loggedInUsers.length == 0) {
          state.loggedInUsers = null;
          state.logoutError = "No user is logged in";
          window.redirect("/");
        }

        // window.alert(action.payload);
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.status = "loading";
        console.log("pending");
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = "success";
        // state.user = action.payload;
        // state.loggedInUsers = action.payload;
        console.log("fullfilled");
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(action.payload);
        console.log(action.payload);
        // getLoggedInUsers();
        // window.alert(action.payload);
      });
  },
});

//
export const { setUploadImg, clearLogoutError } = studentAuthSlice.actions;
export default studentAuthSlice.reducer;
