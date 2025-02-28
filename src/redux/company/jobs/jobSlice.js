import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getCookie from "../../../util/getToken";
import toast from "react-hot-toast";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;


const jobState = {
    cursor:"",
    jobs : [],
    loading: false,
    error: null,
    jobDetails:null,
    jobLoading:false,
    jobError:null,
}

export const getJobs = createAsyncThunk(
    "job/getJobs",
    async ({companyId,cursor,limit=10}, { rejectWithValue }) => {
        console.log(companyId, "companyId")
        try {
            const req = await axios.get(
                `${REACT_APP_API_URL}/api/company/all-jobs/${companyId}?cursor=${cursor}&limit=${limit}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": getCookie("token"),
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
            const token = getCookie("token");
            const req = await axios.post(
                `${REACT_APP_API_URL}/api/company/jobs/${companyId}`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                }
            );
            return req.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "An error occurred");

        }
    }
);

export const updateJob = createAsyncThunk(
    "job/updateJob",
    async ({ jobId, data }, { rejectWithValue }) => {
        try {
            const req = await axios.put(
                `${REACT_APP_API_URL}/api/company/jobs/${jobId}`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": getCookie("token"),
                    },
                }
            );
            return req.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "An error occurred");

        }
    }
);


// get all company job tests

export const getCompanyJobTests = createAsyncThunk(
    "job/getCompanyJobTests",
    async (_, { rejectWithValue }) => {
        try {
            const req = await axios.get(
                `${REACT_APP_API_URL}/api/company/test/all-tests`,

                {
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": getCookie("token"),
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
                // console.log(action.payload, "jobs")
                state.jobs = [...state.jobs,...action.payload.jobs];
                state.cursor=action.payload.nextCursor;
                console.log(action.payload, "jobs")
            })
            .addCase(getJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                // toast.error(action.payload);
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
            .addCase(createJob.pending, (state) => {
                state.jobLoading = true;
            })
            .addCase(createJob.fulfilled, (state, action) => {
                state.jobLoading = false;
                toast.success("Job Created Successfully");
                window.location.href = `/company/pr/jobs/${action.payload.job._id}`;
            })
            .addCase(createJob.rejected, (state, action) => {
                state.jobLoading = false;
                toast.error(action.payload);
            })
            .addCase(updateJob.pending, (state) => {
                state.jobLoading = true;
            })
            .addCase(updateJob.fulfilled, (state, action) => {
                state.jobLoading = false;
                state.jobDetails = action.payload.job;
                // window.location.href = `/company/pr/jobs/${action.payload.job._id}`;


                toast.success("Job Updated Successfully");
            })
            .addCase(updateJob.rejected, (state, action) => {
                state.jobLoading = false;
                toast.error(action.payload);
            });
          
    },
});

export const { clearJobDetails } = jobSlice.actions;

export default jobSlice.reducer;
