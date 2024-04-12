import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getIp from "./getIp";
import toast from "react-hot-toast";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
// const REACT_APP_API_URL = "http://localhost:4000";

// console.log(process.env);

//initial state

const collageState = {
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
  sendMailLoading: false,
  mail: {
    total: 0,
    attachments: [],
    emailsReceived: [],
    emailsSent: [],
  },
  LOGIN_LOADING: false,
  USER_LOADING: false,
};

export const deleteMail = createAsyncThunk(
  "collageAuth/searchMail",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.delete(
        `${REACT_APP_API_URL}/api/college/inbox/delete/${data}`,

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
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const searchMail = createAsyncThunk(
  "collageAuth/searchMail",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/college/inbox/search`,
        data,
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
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const sendReply = createAsyncThunk(
  "collageAuth/sendMail",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/college/inbox/reply`,
        data,
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
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const uploadAttachment = createAsyncThunk(
  "collageAuth/uploadAttachment",
  async (data, { rejectWithValue }) => {
    try {
      let formData = new FormData();
      data.forEach((file, index) => {
        formData.append(`file${index}`, file);
      });

      const req = await axios.post(
        `${REACT_APP_API_URL}/api/college/inbox/file`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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

export const sendMail = createAsyncThunk(
  "collageAuth/sendMail",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/college/inbox/sendMail/college`,
        data,
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

export const getMail = createAsyncThunk(
  "collageAuth/getMail",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.get(
        `${REACT_APP_API_URL}/api/college/inbox/Mail?skip=${data.skip}&limit=${data.limit}`,

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
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getSecretQr = createAsyncThunk(
  "collageAuth/getSecretQr",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.get(
        `${REACT_APP_API_URL}/api/college/2fa/getSecretQr`,
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
  "collageAuth/selectAuth",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/college/selectAuth`,
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
  "collageAuth/verifyQr",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/college/2fa/verifyQr`,
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

export const registerCollage = createAsyncThunk(
  "collageAuth/registerCollage",
  async (data, { rejectWithValue }) => {
    try {
      const ip = getIp();
      console.log("registering", ip);
      // console.log(process.env);
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/college/register`,
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
export const loginCollage = createAsyncThunk(
  "collageAuth/loginCollage",
  async (data, { rejectWithValue }) => {
    try {
      const ip = await getIp();
      console.log("login", ip);
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/college/login`,
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
  "collageAuth/resetPassword",

  async (data, { rejectWithValue }) => {
    try {
      const ip = await getIp();
      console.log("updating", localStorage.getItem("auth-token"));
      const req = await axios.put(
        `${REACT_APP_API_URL}/api/college/password/reset/${data.token}`,
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
  "collageAuth/updatePassword",

  async (data, { rejectWithValue }) => {
    try {
      const ip = await getIp();

      console.log("updating", localStorage.getItem("auth-token"));
      const req = await axios.put(
        `${REACT_APP_API_URL}/api/college/password/update`,
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

export const googleLoginCollage = createAsyncThunk(
  "collageAuth/googleLoginCollage",
  async (accessToken, { rejectWithValue }) => {
    try {
      const ip = await getIp();
      console.log("google login");
      const req = await axios.post(`${REACT_APP_API_URL}/api/college/login`, {
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

export const googleRegisterCollage = createAsyncThunk(
  "collageAuth/googleRegisterCollage",
  async (accessToken, { rejectWithValue }) => {
    try {
      const ip = await getIp();
      console.log("google register");
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/college/register`,
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
  "collageAuth/getLoggedInUsers",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.get(
        `${REACT_APP_API_URL}/api/college/loggedin/users`,
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
  "collageAuth/logoutAUser",
  async (token, { rejectWithValue }) => {
    try {
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/college/logout/user/${token}`,
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
  "collageAuth/removeLoggedOutUser",
  async (token, { rejectWithValue }) => {
    try {
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/college/remove/logout/user/${token}`,
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

const collageAuthSlice = createSlice({
  name: "collageAuth",
  initialState: collageState,
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
      .addCase(searchMail.fulfilled, (state, action) => {
        const mails = action.payload.map((value) => {
          return { mail: value };
        });
        state.mail.emailsReceived = mails;
        // state.mail = { ...state.mail, attachments: action.payload };
      })
      .addCase(uploadAttachment.fulfilled, (state, action) => {
        state.mail = { ...state.mail, attachments: action.payload };
      })
      .addCase(uploadAttachment.rejected, (state, action) => {
        toast.error("files not selected");
      })
      .addCase(getMail.fulfilled, (state, action) => {
        if (action.payload.mail) {
          state.mail = { ...action.payload.mail, total: action.payload.total };
        }
      })
      .addCase(sendMail.pending, (state, action) => {
        state.sendMailLoading = true;
      })
      .addCase(sendMail.fulfilled, (state, action) => {
        state.sendMailLoading = false;
        toast.success("Mail sent successfully");
      })
      .addCase(sendMail.rejected, (state, action) => {
        state.sendMailLoading = false;
        toast.error("Error sending mail");
      })
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

        toast.error(action.payload || "invalid credentials");
      })
      .addCase(loginCollage.pending, (state, action) => {
        state.status = "loading";
        console.log("pending");
      })
      .addCase(loginCollage.fulfilled, (state, action) => {
        // state.status = action.payload
        const { user } = action.payload;
        state.user = user;
        switch (user.authType) {
          case "qr":
            window.location.href = "/collage/settings/security/securityApp";
            break;
          case "otp":
            window.location.href = "/collage/settings/security/secondFA";
            break;
          default:
            state.status = "done";
            state.isLoggedIn = true;
            window.location.href = "/collage/dashboard";
            break;
        }
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
        toast.error(action.payload.message);
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
        toast.success("Password Updated");
        // state.status = action.payload
        // state.isLoggedIn = false;
        // state.user = action.payload.user;
        // localStorage.removeItem("auth-token");

        // getCollege();
        // localStorage.setItem("auth-token", action.payload.token);
      })
      .addCase(updatePassword.rejected, (state, action) => {
        console.log(action.payload);
        toast.error(action.payload);
        // alert(action.payload.message);
      })
      .addCase(googleLoginCollage.pending, (state, action) => {
        state.status = "loading";
        console.log("pending google login");
      })
      .addCase(googleLoginCollage.fulfilled, (state, action) => {
        console.log("fuillfilled google login");
        state.user = action.payload.user;
        state.status = action.payload;
        localStorage.setItem("auth-token", action.payload.token);
        switch (state.user.authType) {
          case "qr":
            window.location.href = "/collage/settings/security/securityApp";
            break;
          case "otp":
            window.location.href = "/collage/settings/security/secondFA";
            break;
          default:
            state.status = "done";
            state.isLoggedIn = true;
            window.location.href = "/collage/dashboard";
            break;
        }
      })
      .addCase(googleLoginCollage.rejected, (state, action) => {
        // console.log(action.payload);
        toast.error(action.payload);
        // window.alert(action.payload);
        window.location.href = "/";
      })
      .addCase(googleRegisterCollage.pending, (state, action) => {
        state.status = "loading";
        console.log("pending");
      })
      .addCase(googleRegisterCollage.fulfilled, (state, action) => {
        state.status = action.payload;
        state.isLoggedIn = true;
        state.user = action.payload.user;
        localStorage.setItem("auth-token", action.payload.token);
        window.location.href = "/collage/dashboard";
        // Add any fetched posts to the array
        console.log("fullfilled");
      })
      .addCase(googleRegisterCollage.rejected, (state, action) => {
        // console.log(action.payload);

        state.error = action.payload;
        toast.error(action.payload);

        // window.alert(action.payload);
        window.location.href = "/";
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
        state.mail = {
          emailsReceived: [],
          emailsSent: [],
        };
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

export const getSentEmails = (state) => {
  return state.collageAuth.user.emailsSent.map((value) => {
    return { ...value, isChecked: false };
  });
};

export const getInbox = (state) => {
  return state.collageAuth.mail.emailsReceived?.map((value) => {
    return { ...value, isChecked: false };
  });
};
//
export const { setUploadImg, clearLogoutError } = collageAuthSlice.actions;
export default collageAuthSlice.reducer;
