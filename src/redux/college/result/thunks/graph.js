import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getHeaders } from "../../../../util/isCompany";

export const getResultGraph = createAsyncThunk(
  "result/getResultGraph",
  async (_, { rejectWithValue }) => {
    try {
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/assessments/result/graph?duration=year`,
       getHeaders()
      );

      const res = req.data;
      return res;
    } catch (error) {
      //console.log("catch", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAssessmentOverview = createAsyncThunk(
  "result/getAssessmentOverview",
  async (id, { rejectWithValue }) => {
    try {
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/assessments/overview/${id}`,
        getHeaders()
      );

      const res = req.data;
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
