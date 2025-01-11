// collegeAuthSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getCookie from "../../../util/getToken";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const companyState = {
  register: {
    loading: false,
    error: null,
  },
  data: null,
  login: {
    loading: false,
    error: null,
  },
  isCompanyLogin: false,
};

export const RegisterCompany = createAsyncThunk(
  "companyAuth/register",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/company/register`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
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

export const LoginCompany = createAsyncThunk(
  "companyAuth/login",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/company/signin`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
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

export const uploadPicture = createAsyncThunk(
  "companyAuth/uploadPicture",
  async ({ avatar }, { rejectWithValue }) => {
    try {
      // if (type === "logo") {
      //     formData.append("logo", image);
      //     // Use FormData.entries() to log all the form data
      //     for (let [key, value] of formData.entries()) {
      //         console.log(`${key}: ${value}`);
      //     }
      // } else {
      //     formData.append("cover", image);
      // }

      const req = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/company/update/logo`,
        { logo: avatar },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "auth-token": getCookie("token"),
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

export const uploadCoverCompany = createAsyncThunk(
  "companyAuth/uploadCoverCompany",
  async ({ cover }, { rejectWithValue }) => {
    try {
      // if (type === "logo") {
      //     formData.append("logo", image);
      //     // Use FormData.entries() to log all the form data
      //     for (let [key, value] of formData.entries()) {
      //         console.log(`${key}: ${value}`);
      //     }
      // } else {
      //     formData.append("cover", image);
      // }

      const req = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/company/update/cover`,
        { cover },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "auth-token": getCookie("token"),
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

export const getCompany = createAsyncThunk(
  "companyAuth/getCompany",
  async (_, { rejectWithValue }) => {
    try {
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/company/me`,

        {
          headers: {
            "auth-token": getCookie("token"),
          },
        }
      );
      console.log(req.data, "inside get company");
      return req.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const logoutCompany = createAsyncThunk(
  "companyAuth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/company/logout`,
        {},
        {
          headers: {
            "auth-token": getCookie("token"),
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

export const updateCompany = createAsyncThunk(
  "collegeAuth/updateCompany",
  async (data, { rejectWithValue }) => {
    try {
      //console.log("updating", localStorage.getItem("auth-token"));
      const req = await axios.put(
        `${REACT_APP_API_URL}/api/company/update`,
        data,

        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": getCookie("token"),
          },
        }
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

const companyAuthSlice = createSlice({
  name: "companyAuth",
  initialState: companyState,
  reducers: {
    setUploadImg: (state, action) => {
      state.uploadImg = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterCompany.pending, (state) => {
        state.register.loading = true;
        state.register.error = null;
      })
      .addCase(RegisterCompany.fulfilled, (state, action) => {
        state.register.loading = false;
        state.data = action.payload.user;
        state.isCompanyLogin = true;
        document.cookie = `token=${action.payload.token}; path=/; max-age=86400;  SameSite=Strict`;
      })
      .addCase(RegisterCompany.rejected, (state, action) => {
        state.login.loading = false;
        state.login.error = action.payload;
      })
      .addCase(LoginCompany.pending, (state) => {
        state.login.loading = true;
        state.login.error = null;
      })
      .addCase(LoginCompany.fulfilled, (state, action) => {
        state.login.loading = false;
        state.data = action.payload.user;
        state.isCompanyLogin = true;
        document.cookie = `token=${action.payload.token}; path=/; max-age=86400;  SameSite=Strict`;
      })
      .addCase(LoginCompany.rejected, (state, action) => {
        state.login.loading = false;
        state.login.error = action.payload;
      })
      .addCase(getCompany.pending, (state) => {
        state.data = null;
      })
      .addCase(getCompany.fulfilled, (state, action) => {
        const user = action.payload.company;
        state.data = {
          _id: user?._id || null,
          status: user?.status || "pending",
          statusChangedAt: user?.statusChangedAt || null,
          commentsByAdmin: user?.commentsByAdmin || [
            {
              comment: "",
              commentedBy: null,
              commentedAt: null,
            },
          ],
          Email: user?.Email || "",
          role: user?.role || "company",
          FirstName: user?.FirstName || "",
          LastName: user?.LastName || "",
          Password: user?.Password || "",
          avatar: {
            public_id: user?.avatar?.public_id || "",
            url: user?.avatar?.url || "",
          },
          basic: {
            coverPhoto: user?.basic?.coverPhoto || "",
            publicIdLogo: user?.basic?.publicIdLogo || "",
            publicIdCover: user?.basic?.publicIdCover || "",
            logo: user?.basic?.logo || "",
            companyName: user?.basic?.companyName || "",
            website: user?.basic?.website || "",
            totalEmployees: user?.basic?.totalEmployees || 0,
            yearFounded: user?.basic?.yearFounded || 0,
            hqCity: user?.basic?.hqCity || "",
            annualRevenue: user?.basic?.annualRevenue || 0,
            sector: user?.basic?.sector || "",
            industry: user?.basic?.industry || "",
            companyType: user?.basic?.companyType || "",
            status: user?.basic?.status || "",
          },
          Phone: user?.Phone || 0,
          location: user?.location || {},
          leader: user?.leader || {},
          about: {
            description: user?.about?.description || "",
            missions: user?.about?.missions || "",
            programs: user?.about?.programs || "",
          },
          awards: user?.awards || [],
          dashboard: user?.dashboard || {},
          students: user?.students || [],
          jobs: user?.jobs || [],
          assessments: user?.assessments || [],
          createdAt: user?.createdAt || Date.now(),
          resetPasswordToken: user?.resetPasswordToken || "",
          resetPasswordExpire: user?.resetPasswordExpire || null,
          loginActivity: user?.loginActivity || [],
          otp: user?.otp || null,
          otpExpires: user?.otpExpires || null,
          otpVerified: user?.otpVerified || false,
          authType: user?.authType || "none",
          emails: user?.emails || [],
          emailsSent: user?.emailsSent || [],
        };
        state.isCompanyLogin = true;
        console.log(action.payload);
      })
      .addCase(getCompany.rejected, (state, action) => {
        alert(action.payload);
        state.data = null;
        state.isCompanyLogin = false;
      })
      .addCase(updateCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.company;
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(uploadPicture.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadPicture.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.company;
      })
      .addCase(uploadPicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutCompany.fulfilled, (state) => {
        state.loading = false;
        state.data = null;
        state.isCompanyLogin = false;
        document.cookie = "token=; path=/; max-age=0;  SameSite=Strict";
        window.location.href = "/company";
      })
      .addCase(logoutCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectRegisterState = (state) => state.companyAuth.register;
export const selectLoginState = (state) => state.companyAuth.login;
export const selectCompanyData = (state) => state.companyAuth.data;

export const { setUploadImg } = companyAuthSlice.actions;

export default companyAuthSlice.reducer;
