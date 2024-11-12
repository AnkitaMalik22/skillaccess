import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import getCookie from "../../../util/getToken";
import toast from "react-hot-toast";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const initialState = {
jobs: [],
loading: false,
error: null,
jobDetails: null,


};

export const getAllJobs = createAsyncThunk(
    "job/getAllJobs",
    async (data, { rejectWithValue }) => {
        try {
            const req = await axios.get(`${REACT_APP_API_URL}/api/company/jobs/college/${data}`, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": getCookie("token"),
                },
            });
            return req.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "An error occurred");
        }
    }
);


const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        getJobDetails: (state, action) => {
            state.jobDetails = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllJobs.pending, (state) => {
            state.loading = true;
        })
        .addCase(getAllJobs.fulfilled, (state, action) => {
            state.loading = false;
            state.jobs = action.payload.jobs;
        })
        .addCase(getAllJobs.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            toast.error(action.payload);
        })
    },


});


export const { getJobDetails } = jobSlice.actions;
export default jobSlice.reducer;