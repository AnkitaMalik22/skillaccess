import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  students: [],
  companies: [],
  assessments: [],
  jobs: [],
  placedStudents: [],
  newCompanies: [],
  newJobs: [],
  recentPlacements: [],
  jobDetails: {},
};

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

// Get all students -- /api/student/college/all -- GET | College

export const getStudent = createAsyncThunk(
  "dashboard/getStudent",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/student/college/get/all`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const res = req.data;
      console.log(res.students);
      // console.log(res)
      return res.students;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get all companies -- /api/company/college/all -- GET | College

export const getCompany = createAsyncThunk(
  "dashboard/getCompany",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/college/dashboard/companies`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const res = req.data;
      return res.companies;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get all assessments -- /api/assessment/college/all -- GET | College

export const getAssessment = createAsyncThunk(
  "dashboard/addAssessment",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/college/dashboard/assessments`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const res = req.data;
      return res.assessments;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get all placed students -- /api/college/placed/students

export const getPlacedStudents = createAsyncThunk(
  "dashboard/getPlacedStudents",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/college/dashboard/placed/students`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const res = req.data;
      return res.students;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get total jobs -- /api/college/dashboard/jobs

export const getTotalJobs = createAsyncThunk(
  "dashboard/getTotalJobs",

  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/college/dashboard/jobs`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const res = req.data;
      console.log(res.jobs);
      return res.jobs;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getNewCompanies = createAsyncThunk(
  "dashboard/newCompanies",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/college/dashboard/companies/new`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const res = req.data;
      console.log(res.companies, "hdhdhd");
      return res.companies;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getNewJobs = createAsyncThunk(
  "dashboard/newJobs",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.get(
        `${REACT_APP_API_URL}/api/student/dashboard/newjobs`
      );
      const res = req.data;
      return res.jobs;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getJobById = createAsyncThunk(
  "dashboard/jobDetails",
  async (jobId, { rejectWithValue }) => {
    try {
      const req = await axios.get(
        `${REACT_APP_API_URL}/api/company/jobs/${jobId}`
      );
      const res = req.data;
      console.log(res);
      return res.jobs;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudent.pending, (state, action) => {
        // state.status = 'loading';
        console.log("loading");
      })
      .addCase(getStudent.fulfilled, (state, action) => {
        console.log("success", action.payload);
        state.status = "success";
        state.students = action.payload;
      })
      .addCase(getStudent.rejected, (state, action) => {
        console.log("rejected");
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(getCompany.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCompany.fulfilled, (state, action) => {
        state.status = "success";
        state.companies = action.payload;
      })
      .addCase(getCompany.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getAssessment.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAssessment.fulfilled, (state, action) => {
        state.status = "success";
        state.assessments = action.payload;
      })
      .addCase(getAssessment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getPlacedStudents.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPlacedStudents.fulfilled, (state, action) => {
        state.status = "success";
        state.placedStudents = action.payload;
      })
      .addCase(getPlacedStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getTotalJobs.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getTotalJobs.fulfilled, (state, action) => {
        state.status = "success";
        state.jobs = action.payload;
      })
      .addCase(getTotalJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getNewCompanies.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getNewCompanies.fulfilled, (state, action) => {
        state.status = "success";
        state.newCompanies = action.payload;
        console.log(state.newCompanies, "new companies");
      })
      .addCase(getNewCompanies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getNewJobs.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getNewJobs.fulfilled, (state, action) => {
        state.status = "success";
        state.newJobs = action.payload;
        
      })
      .addCase(getNewJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getJobById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getJobById.fulfilled, (state, action) => {
        state.jobDetails = action.payload;
      })
      .addCase(getJobById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
      
  },
});

export const {} = dashboardSlice.actions;

export default dashboardSlice.reducer;
