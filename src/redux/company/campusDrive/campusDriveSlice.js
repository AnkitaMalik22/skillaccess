import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getCookie from "../../../util/getToken";
import { getHeaders } from "../../../util/isCompany";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const config = {
  headers: {
    "Content-Type": "application/json",
    "auth-token": getCookie("token"),
  },
};

// Initial State
const initialState = {
  campusDrives: [],
  currentCampusDrive: null,
  colleges: [],
  loading: false,
  error: null,
  college_campus_drives: [],
  assignedColleges: [], 
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalColleges: 0,
    limit: 10,
  },
};

// Async Thunks
export const createCampusDrive = createAsyncThunk(
  "campusDrive/create",
  async (driveData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/company/campus-drive/create`,
        driveData,
        config
      );
      return response.data.campusDrive;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllCampusDrives = createAsyncThunk(
  "campusDrive/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/api/company/campus-drive/get`,
        config
      );
      return response.data.campusDrives;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllCollegesForDrive = createAsyncThunk(
  "campusDrive/fetchAllColleges",
  async ({ driveId, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/api/company/campus-drive/${driveId}/colleges?page=${page}&limit=${limit}`,
        config
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCampusDriveDetails = createAsyncThunk(
  `campusDrive/fetchDetails`,
  async (driveId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/api/company/campus-drive/${driveId}`,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCampusDrivesOfCollege = createAsyncThunk(
  `campusDrive/fetchCampusDrivesOfCollege`,
  async (collegeId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/api/company/campus-drive/get/college`,
       getHeaders()
      );
      console.log(response)
      return response.data?.data?.campusDrives;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addCollegesToCampusDrive = createAsyncThunk(
  "campusDrive/addColleges",
  async ({ driveId, colleges }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/company/campus-drive/v1/colleges/add/${driveId}`,
        { colleges },
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const campusDriveSlice = createSlice({
  name: "campusDrive",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Campus Drive
      .addCase(createCampusDrive.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCampusDrive.fulfilled, (state, action) => {
        state.loading = false;
        state.campusDrives.push(action.payload);
      })
      .addCase(createCampusDrive.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get All Campus Drives
      .addCase(getAllCampusDrives.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCampusDrives.fulfilled, (state, action) => {
        state.loading = false;
        state.campusDrives = action.payload;
      })
      .addCase(getAllCampusDrives.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Colleges for Campus Drive

      // Fetch Campus Drive Details
      .addCase(fetchCampusDriveDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCampusDriveDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCampusDrive = action.payload;
      })
      .addCase(fetchCampusDriveDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch All Colleges for Campus Drive
      .addCase(fetchAllCollegesForDrive.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCollegesForDrive.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.colleges = action.payload.availableColleges;
        state.assignedColleges = action.payload.assignedColleges;

        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAllCollegesForDrive.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
        // Fetch Campus Drives of College
        .addCase(fetchCampusDrivesOfCollege.pending, (state) => {
            state.loading = true;
            }
        )
        .addCase(fetchCampusDrivesOfCollege.fulfilled, (state, action) => {
            state.loading = false;
            state.college_campus_drives = action.payload;
        })
        .addCase(fetchCampusDrivesOfCollege.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        // Add Colleges to Campus Drive
        .addCase(addCollegesToCampusDrive.pending, (state) => {
          state.loading = true;
        })
        .addCase(addCollegesToCampusDrive.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
        })
        .addCase(addCollegesToCampusDrive.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
  },
});

export const { clearError, resetState } = campusDriveSlice.actions;
export default campusDriveSlice.reducer;
