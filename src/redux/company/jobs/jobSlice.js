import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getCookie from "../../../util/getToken";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;


const jobState = {

    jobs : [],
    loading: false,
    error: null,
    jobDetails:null,
    jobLoading:false,
    jobError:null,
}

export const getJobs = createAsyncThunk(
    "job/getJobs",
    async (companyId, { rejectWithValue }) => {
        console.log(companyId, "companyId")
        try {
            const req = await axios.get(
                `${REACT_APP_API_URL}/api/company/all-jobs/${companyId}`,
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




export const getJobDetails = createAsyncThunk(
    "job/getJobDetails",
    async (data, { rejectWithValue }) => {
        try {
            const req = await axios.get(
                `${REACT_APP_API_URL}/api/company/jobs/${data}`,
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

export const createJob = createAsyncThunk(
    "job/createJob",
    async ({companyId , data}, { rejectWithValue }) => {
        try {
            console.log(data, "data" , companyId, "companyId")
            const req = await axios.post(
                `${REACT_APP_API_URL}/api/company/jobs/${companyId}`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": getCookie(),
                    },
                }
            );
            return req.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "An error occurred");

        }
    }
);


const jobSlice = createSlice({
    name: "job",
    initialState: jobState,
    reducers: {
        clearJobDetails: (state) => {
            state.jobDetails = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getJobs.pending, (state) => {
                state.loading = true;
            })
            .addCase(getJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = action.payload.jobs;
                console.log(action.payload, "jobs")
            })
            .addCase(getJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getJobDetails.pending, (state) => {
                state.jobLoading = true;
            })
            .addCase(getJobDetails.fulfilled, (state, action) => {
                state.jobLoading = false;
                state.jobDetails = action.payload.job;
            })
            .addCase(getJobDetails.rejected, (state, action) => {
                state.jobLoading = false;
                state.jobError = action.payload;
            })
    },
});

export const { clearJobDetails } = jobSlice.actions;

export default jobSlice.reducer;
