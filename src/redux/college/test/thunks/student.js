import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getStudentResponse = createAsyncThunk(
  "test/studentResponse",
  async (id, { rejectWithValue }) => {
    try {
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/studentDummy/response/${id}`,

        {
          headers: {
            "Content-Type": "application/json",

            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      const res = req.data;

      //console.log(res);

      return res.studentResponse;
    } catch (error) {
      //console.log("catch", error.response.data);

      return rejectWithValue(error.response.data);
    }
  }
);

export const getResponseByTestandStudent = createAsyncThunk(
  "test/getResponseByTestandStudent",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/studentDummy/test/student?testId=${data.testId}&studentId=${data.studentId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const res = req.data;
      //console.log(res.studentResponse[0]);
      return res.studentResponse[0];
    } catch (error) {
      //console.log("catch", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// INVITE STUDENTS TO ASSESSMENTS

export const inviteToTest = createAsyncThunk(
  "test/inviteToTest",
  async (data, { rejectWithValue }) => {
    try {
      //console.log(data);
      const req = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/assessments/invite/students/${data.testId}`,
        data.students,
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
