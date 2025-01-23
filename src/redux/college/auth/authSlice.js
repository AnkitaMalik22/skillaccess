import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getIp from "./getIp";
import toast from "react-hot-toast";
import { getHeaders } from "../../../util/isCompany";
// import { getHeaders } from "../../../util/isCompany";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
// const REACT_APP_API_URL = "http://localhost:4000";

// //console.log(process.env);

//initial state

const collegeState = {
  qr: {
    secret: "",
    code: "",
  },
  status: "",
  error: "",
  Error: [],
  isLoggedIn: false,
  user: {
    avatar: {
      public_id: "avatars/htpaphxj1d5lhfsqjvhs",
      url: "https://res.cloudinary.com/dkqgktzny/image/upload/v1713868738/avatars/htpaphxj1d5lhfsqjvhs.png",
    },
    _id: "",

    role: "college",
    CollegeName: "",
    Email: "",
    FirstName: "",
    LastName: "",
    AvgPackage: 0,
    Phone: null,
    TotalStudents: 0,
    TotalCompanies: 0,
    TotalJobs: 0,
    pendingStudents: [],
    students: [],
    assessments: [],
    topics: [],
    otp: null,
    otpExpires: null,
    otpVerified: false,
    authType: "qr",
    createdAt: "2024-04-03T11:49:22.756Z",
    loginActivity: [],

    emailsSent: [],
    __v: 12,
  },
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
  dummyUser: null,
  selectedPlan: null,
  balance: 0,
};

export const deleteMail = createAsyncThunk(
  "collegeAuth/deleteMail",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.delete(
        `${REACT_APP_API_URL}/api/college/inbox/delete/${data.id}?type=${data.type}`,
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
  "collegeAuth/searchMail",
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
  "collegeAuth/sendMail",
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
  "collegeAuth/uploadAttachment",
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

      //console.log(res);
      return res;
    } catch (error) {
      //console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const sendMail = createAsyncThunk(
  "collegeAuth/sendMail",
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

      //console.log(res);
      return res;
    } catch (error) {
      //console.log(error);
      if (error.response.status === 404) {
        return rejectWithValue("User not registered on the platform");
      }
      const errorMessage =
        error.response.data.message || "An error occurred while sending mail";
      return rejectWithValue(errorMessage);
    }
  }
);

export const getMail = createAsyncThunk(
  "collegeAuth/getMail",
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
  "collegeAuth/getSecretQr",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.get(
        `${REACT_APP_API_URL}/api/college/2fa/getSecretQr/${localStorage.getItem(
          "userId"
        )}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const res = req.data;

      //console.log(res);
      return res;
    } catch (error) {
      //console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const selectAuth = createAsyncThunk(
  "collegeAuth/selectAuth",
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
      //console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const verifyQr = createAsyncThunk(
  "collegeAuth/verifyQr",
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
      //console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const registerCollege = createAsyncThunk(
  "collegeAuth/registerCollege",
  async (data, { rejectWithValue }) => {
    try {
      const ip = getIp();
      //console.log("registering", ip);
      // //console.log(process.env);
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/college/register`,
        { ...data, ip },
        { withCredentials: true }
      );
      const res = req.data;
      localStorage.setItem("auth-token", res.token);
      return res.data;
    } catch (error) {
      //console.log("catch");
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const loginCollege = createAsyncThunk(
  "collegeAuth/loginCollege",
  async (data, { rejectWithValue }) => {
    try {
      const ip = await getIp();
      //console.log("login", ip);
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/college/login`,
        { ...data, ip },
        { withCredentials: true }
      );
      const res = req.data;

      //console.log(res);
      return res;
    } catch (error) {
      //console.log("catch");
      return rejectWithValue(error.response.data);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "collegeAuth/forgotPassword",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/college/password/forgot`,
        data,
        getHeaders()
      );
      const res = req.data;

      return res;
    } catch (error) {
      //console.log("catch");
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateCollege = createAsyncThunk(
  "collegeAuth/updateCollege",
  async (data, { rejectWithValue }) => {
    try {
      //console.log("updating", localStorage.getItem("auth-token"));
      const req = await axios.put(
        `${REACT_APP_API_URL}/api/college/update`,
        data,

        getHeaders()
      );

      const res = req.data;
      // console.log("should not reject");
      console.log(res);
      return res.college;
    } catch (error) {
      // console.log("catch", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getCollege = createAsyncThunk(
  "collegeAuth/getCollege",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/api/college/me`,
        getHeaders()
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateAvatar = createAsyncThunk(
  "collegeAuth/updateAvatar",
  async (data, { rejectWithValue }) => {
    try {
      //console.log("updating", localStorage.getItem("auth-token"));
      const req = await axios.put(
        `${REACT_APP_API_URL}/api/college/update/avatar`,
        data,
        getHeaders()
      );
      const res = req.data;
      // //console.log(res);
      return res;
    } catch (error) {
      //console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const logoutCollege = createAsyncThunk(
  "collegeAuth/logoutCollege",
  async (_, { rejectWithValue }) => {
    try {
      //console.log("logout");
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
      //console.log("catch");
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "collegeAuth/resetPassword",

  async (data, { rejectWithValue }) => {
    try {
      const ip = await getIp();
      //console.log("updating", localStorage.getItem("auth-token"));
      const req = await axios.put(
        `${REACT_APP_API_URL}/api/college/password/reset/${data.token}`,
        { password: data.password, confirmPassword: data.confirmPassword, ip }

        //  getHeaders()
      );
      const res = req.data;
      return res;
    } catch (error) {
      //console.log("catch", error.response.data);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "collegeAuth/updatePassword",

  async (data, { rejectWithValue }) => {
    try {
      const ip = await getIp();

      //console.log("updating", localStorage.getItem("auth-token"));
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
      //console.log("catch", error.response.data);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const googleLoginCollege = createAsyncThunk(
  "collegeAuth/googleLoginCollege",
  async (accessToken, { rejectWithValue }) => {
    try {
      const ip = await getIp();
      //console.log("google login");
      const req = await axios.post(`${REACT_APP_API_URL}/api/college/login`, {
        googleAccessToken: accessToken,
        ip,
      });
      const res = await req.data;
      localStorage.setItem("auth-token", res.token);
      return res;
    } catch (error) {
      //console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const googleRegisterCollege = createAsyncThunk(
  "collegeAuth/googleRegisterCollege",
  async (accessToken, { rejectWithValue }) => {
    try {
      const ip = await getIp();
      //console.log("google register");
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/college/register`,
        { googleAccessToken: accessToken, ip: ip }
      );
      const res = req.data;
      //console.log(res, "res.data");
      localStorage.setItem("auth-token", res.token);
      return res;
    } catch (error) {
      //console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getLoggedInUsers = createAsyncThunk(
  "collegeAuth/getLoggedInUsers",
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
      //console.log("catch");
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutAUser = createAsyncThunk(
  "collegeAuth/logoutAUser",
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
      //console.log("catch");
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeLoggedOutUser = createAsyncThunk(
  "collegeAuth/removeLoggedOutUser",
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
      //console.log("catch");
      return rejectWithValue(error.response.data);
    }
  }
);

const collegeAuthSlice = createSlice({
  name: "collegeAuth",
  initialState: collegeState,
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
        state.mail.emailsReceived = action.payload.emailsReceived;
        state.mail.emailsSent = action.payload.emailsSent;
        state.mail.total = action.payload.total;
        state.mail.totalSent = action.payload.totalSent;

        // state.mail = { ...state.mail, attachments: action.payload };
      })
      .addCase(uploadAttachment.fulfilled, (state, action) => {
        let atach = [];
        if (state.mail.attachments) {
          atach = [...state.mail.attachments];
        }
        state.mail = {
          ...state.mail,
          attachments: [...atach, ...action.payload],
        };
      })
      .addCase(uploadAttachment.rejected, (state, action) => {
        toast.error("files not selected");
      })
      .addCase(getMail.fulfilled, (state, action) => {
        if (action.payload.mail) {
          state.mail = {
            ...action.payload.mail,
            total: action.payload.total,
            totalSent: action.payload.totalSent,
          };
        }
      })
      .addCase(sendMail.pending, (state, action) => {
        state.sendMailLoading = true;
      })
      .addCase(sendMail.fulfilled, (state, action) => {
        state.sendMailLoading = false;
        state.mail.attachments = [];
        toast.success("Mail sent successfully");
      })
      .addCase(sendMail.rejected, (state, action) => {
        state.sendMailLoading = false;
        console.log(action.payload);
        toast.error(action.payload || "Failed to send mail");
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

        window.location.href = "/college/dashboard";
      })
      .addCase(verifyQr.rejected, (state, action) => {
        toast.error("invalid token");
      })
      .addCase(getSecretQr.fulfilled, (state, action) => {
        state.qr.secret = action.payload.secret.ascii;
        state.qr.code = action.payload.qr;
      })

      .addCase(forgotPassword.fulfilled, (state, action) => {})
      .addCase(registerCollege.pending, (state, action) => {
        state.status = "loading";

        //console.log("pending");
      })
      .addCase(registerCollege.fulfilled, (state, action) => {
        // state.status = action.payload
        state.isLoggedIn = true;
        state.user = action.payload;
        localStorage.setItem("userType", "colleeg");
        // Add any fetched posts to the array
        //console.log("fullfilled");
      })
      .addCase(registerCollege.rejected, (state, action) => {
        //console.log(action.payload);

        // <<<<<<< AnkitaMalik22-ankita-dev
        //   alert(action.payload);
        // =======

        toast.error(action.payload || "invalid credentials");
      })
      .addCase(loginCollege.pending, (state, action) => {
        state.status = "loading";
        //console.log("pending");
      })
      .addCase(loginCollege.fulfilled, (state, action) => {
        // state.status = action.payload
        const { user, token } = action.payload;
        localStorage.setItem("userType", "college");
        switch (user.authType) {
          case "qr":
            window.location.href = "/college/settings/security/securityApp";

            break;
          case "otp":
            window.location.href = "/college/settings/security/secondFA";
            break;
          default:
            state.status = "done";
            state.isLoggedIn = true;
            // window.location.href = "/college/dashboard";
            break;
        }

        state.user = user;
        localStorage.setItem("auth-token", token);
      })
      .addCase(loginCollege.rejected, (state, action) => {
        state.Error = [action.payload];
      })
      .addCase(updateCollege.pending, (state, action) => {
        // state.status = "loading";
        //console.log("pending");
      })
      .addCase(updateCollege.fulfilled, (state, action) => {
        // state.status = action.payload
        state.user = action.payload;
        // window.location.reload(true);
        //console.log("update college fulfilled");
      })
      .addCase(updateCollege.rejected, (state, action) => {
        // //console.log(action.payload);
        // window.alert(action.payload);
        // window.location.reload(true);
        // toast.error(action.payload);
        console.log("rejected update profile");
      })
      .addCase(getCollege.pending, (state, action) => {
        // state.status = "loading";
        // state.USER_LOADING = true;
        //console.log("pending");
      })
      .addCase(getCollege.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.user.role === "college";
        state.user = action.payload.user;
        console.log(action.payload.user);
        state.credit = {
          credit: action.payload?.credit[0]?.credit,
          limit: action.payload?.credit[0]?.limit,
        };
        state.balance = action.payload?.balance;
        state.selectedPlan = action.payload?.credit[0];
        // state.USER_LOADING = false;
        localStorage.setItem("userId", action.payload.user._id);

        // Add any fetched posts to the array
        //console.log("fullfilled get college");
      })
      .addCase(getCollege.rejected, (state, action) => {
        // state.logoutError = action.payload;
        //console.log("rej");
        state.isLoggedIn = false;
        // state.USER_LOADING = false;
        // alert("You are logged out! Please login again");
        // window.location.href = "/";

        if (
          action.payload.message === "Token is blacklisted. Please login again"
        ) {
          localStorage.removeItem("auth-token");
          state.loggedInUsers = null;
          state.logoutError = action.payload;
        }

        //console.log(action.payload.message);
        // toast.error(action.payload.message);
        // window.location.href = "/";
        // window.alert(action.payload);
      })
      .addCase(updateAvatar.pending, (state, action) => {
        // state.status = "loading";
        //console.log("pending avatar");
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        // state.status = action.payload

        state.status = "success";
        //console.log(action);
        // state.user = action.payload.college;
        state.uploadImg = true;
        state.user.avatar = action.payload.user.avatar;

        // getCollege();
        // Add any fetched posts to the array
        //console.log("fullfilled avatar");
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        //console.log("rejected avatar" + action.payload);
        // window.alert(action.payload);
      })
      .addCase(logoutCollege.pending, (state, action) => {
        state.status = "loading";
        //console.log("pending");
      })
      .addCase(logoutCollege.fulfilled, (state, action) => {
        // state.status = action.payload

        state.user = null;
        state.isLoggedIn = false;
        localStorage.clear();
        localStorage.setItem("editable", false);
        // Add any fetched posts to the array
        //console.log("fullfilled");
      })
      .addCase(logoutCollege.rejected, (state, action) => {
        //console.log(action.payload);
        // window.alert(action.payload);
      })
      .addCase(updatePassword.pending, (state, action) => {
        state.status = "loading";
        //console.log("pending");
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.status = action.payload;
        toast.success("Password Updated");
        localStorage.removeItem("auth-token");
        window.location.replace("/");
        // state.status = action.payload
        // state.isLoggedIn = false;
        // state.user = action.payload.user;
        // localStorage.removeItem("auth-token");

        // getCollege();
        // localStorage.setItem("auth-token", action.payload.token);
      })
      .addCase(updatePassword.rejected, (state, action) => {
        //console.log(action.payload);
        toast.error(action.payload);
        // alert(action.payload.message);
      })
      .addCase(googleLoginCollege.pending, (state, action) => {
        state.status = "loading";
        //console.log("pending google login");
      })
      .addCase(googleLoginCollege.fulfilled, (state, action) => {
        //console.log("fuillfilled google login");
        state.user = action.payload.user;
        state.status = action.payload;
        localStorage.setItem("auth-token", action.payload.token);
        switch (state.user.authType) {
          case "qr":
            window.location.href = "/college/settings/security/securityApp";
            break;
          case "otp":
            window.location.href = "/college/settings/security/secondFA";
            break;
          default:
            state.status = "done";
            state.isLoggedIn = true;
            window.location.href = "/college/dashboard";
            break;
        }
      })
      .addCase(googleLoginCollege.rejected, (state, action) => {
        // //console.log(action.payload);
        toast.error(action.payload);
        // window.alert(action.payload);
        window.location.href = "/";
      })
      .addCase(googleRegisterCollege.pending, (state, action) => {
        state.status = "loading";
        //console.log("pending");
      })
      .addCase(googleRegisterCollege.fulfilled, (state, action) => {
        state.status = action.payload;
        state.isLoggedIn = true;
        state.user = action.payload.user;
        localStorage.setItem("auth-token", action.payload.token);
        window.location.href = "/college/dashboard";
        // Add any fetched posts to the array
        //console.log("fullfilled");
      })
      .addCase(googleRegisterCollege.rejected, (state, action) => {
        // //console.log(action.payload);

        state.error = action.payload;
        toast.error(action.payload);

        // window.alert(action.payload);
        window.location.href = "/";
      })
      .addCase(getLoggedInUsers.pending, (state, action) => {
        state.status = "loading";
        //console.log("pending");
      })
      .addCase(getLoggedInUsers.fulfilled, (state, action) => {
        state.status = "success";
        state.loggedInUsers = action.payload;
        // Add any fetched posts to the array
        //console.log("fullfilled");
      })
      .addCase(getLoggedInUsers.rejected, (state, action) => {
        //console.log(action.payload);
        window.alert(action.payload);
      })
      .addCase(logoutAUser.pending, (state, action) => {
        state.status = "loading";
        //console.log("pending");
      })
      .addCase(logoutAUser.fulfilled, (state, action) => {
        state.status = "success";
        // state.user = action.payload;
        state.loggedInUsers = action.payload;
        state.mail = {
          emailsReceived: [],
          emailsSent: [],
        };
        //console.log("fullfilled");
      })
      .addCase(logoutAUser.rejected, (state, action) => {
        //console.log(action.payload);

        window.alert(action.payload);
      })
      .addCase(removeLoggedOutUser.pending, (state, action) => {
        state.status = "loading";
        //console.log("pending");
      })
      .addCase(removeLoggedOutUser.fulfilled, (state, action) => {
        state.status = "success";
        // state.user = action.payload;
        state.loggedInUsers = action.payload;
        //console.log("fullfilled");
      })
      .addCase(removeLoggedOutUser.rejected, (state, action) => {
        //console.log(action.payload);
        // getLoggedInUsers();
        if (state.loggedInUsers.length === 0) {
          state.loggedInUsers = null;
          state.logoutError = "No user is logged in";
          window.redirect("/");
        }

        // window.alert(action.payload);
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.status = "loading";
        //console.log("pending");
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = "success";
        let role = action.payload?.user?.role;
        // console.log(role);
        if (role === "university") {
          window.location.href = "/university";
        } else if (role === "company") {
          window.location.href = "/company";
        } else {
          window.location.href = "/";
        }
        // state.user = action.payload;
        // state.loggedInUsers = action.payload;
        //console.log("fullfilled");
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(action.payload);
        //console.log(action.payload);
        // getLoggedInUsers();
        // window.alert(action.payload);
      });
  },
});

export const getSentEmails = (state) => {
  return state.collegeAuth.user.emailsSent.map((value) => {
    return { ...value, isChecked: false };
  });
};

export const getInbox = (state) => {
  const received = state.collegeAuth.mail.emailsReceived?.map((value) => {
    return { ...value, isChecked: false };
  });
  const sent = state.collegeAuth.mail.emailsSent?.map((value) => {
    return { ...value, isChecked: false };
  });
  return { received, sent };
};
//
export const { setUploadImg, clearLogoutError } = collegeAuthSlice.actions;
export default collegeAuthSlice.reducer;
