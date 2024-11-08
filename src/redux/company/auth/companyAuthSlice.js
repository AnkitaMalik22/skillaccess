// collageAuthSlice.js
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
    login:{
        loading:false,
        error:null
    }

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
            return rejectWithValue(error.response?.data?.message || "An error occurred");

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
            return rejectWithValue(error.response?.data?.message || "An error occurred");
        }
    }
);

export const uploadPicture = createAsyncThunk(
    "companyAuth/uploadPicture",
    async ({ type, image }, { rejectWithValue }) => {
        try {
            const formData = new FormData();

            if (type === "logo") {
                formData.append("logo", image);
                // Use FormData.entries() to log all the form data
                for (let [key, value] of formData.entries()) {
                    console.log(`${key}: ${value}`);
                }
            } else {
                formData.append("cover", image);
            }

            const req = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/company/upload/image`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return req.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "An error occurred");
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
                       "auth-token":getCookie()
                    },
                }
            );
            return req.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "An error occurred");
        }
    }
);


const companyAuthSlice = createSlice({
    name: "companyAuth",
    initialState: companyState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(RegisterCompany.pending, (state) => {
                state.register.loading = true;
                state.register.error = null;
            })
            .addCase(RegisterCompany.fulfilled, (state, action) => {
                state.register.loading = false;
                state.data = action.payload.user;
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
                document.cookie = `token=${action.payload.token}; path=/; max-age=86400;  SameSite=Strict`;
            })
            .addCase(LoginCompany.rejected, (state, action) => {
                state.login.loading = false;
                state.login.error = action.payload;
            }).addCase(getCompany.pending, (state) => {
              
            })
            .addCase(getCompany.fulfilled, (state, action) => {
             
                state.data = action.payload.user;
               
            })
            .addCase(getCompany.rejected, (state, action) => {
              
            });
    },
});

export const selectRegisterState = (state) => state.companyAuth.register;
export const selectLoginState = (state) => state.companyAuth.login;
export const  selectCompanyData = (state) => state.companyAuth.data;

export default companyAuthSlice.reducer;
