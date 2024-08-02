import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getResultGraph = createAsyncThunk(
  "result/getResultGraph",
  async (_, { rejectWithValue }) => {
    try {
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/assessments/result/graph?duration=year`,
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
      return rejectWithValue(error.response.data);
    }
  }
);
