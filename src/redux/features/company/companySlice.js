import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  companyDetails: {},
  newCompanies: [],
  recentPlacements: [],
  students: [],
  assessments: [],
  jobs: [],
  placedStudents: [],
  newJobs: [],
};

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export const getCompanyDetails = createAsyncThunk(
  "company/getCompanyDetails",
  async (companyId, { rejectWithValue }) => {
    try {
      const req = await axios.get(
        `${REACT_APP_API_URL}/api/company/${companyId}`
      );
      const res = req.data;
      return res.company;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    clearCompanyDetails: (state) => {
      state.companyDetails = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCompanyDetails.fulfilled, (state, action) => {
      state.companyDetails = action.payload;
    });
  },
});

// export const { getCompanyDetails } = companySlice.actions;

export default companySlice.reducer;
