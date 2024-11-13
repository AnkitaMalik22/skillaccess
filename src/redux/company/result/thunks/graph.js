import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getCookie from "../../../../util/getToken";

export const getResultGraph = createAsyncThunk(
  "resultCompany/getResultGraph",
  async (_, { rejectWithValue }) => {
    try {
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/company/test/result/graph?duration=year`,
        {
          headers: {
            "Content-Type": "application/json",

            "auth-token": getCookie("token"),
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

export const getAssessmentOverviewCompany = createAsyncThunk(
  "resultCompany/getAssessmentOverview",
  async (id, { rejectWithValue }) => {
    try {
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/company/test/overview/${id}`,
        {
          headers: {
            "Content-Type": "application/json",

            "auth-token": getCookie("token"),
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
