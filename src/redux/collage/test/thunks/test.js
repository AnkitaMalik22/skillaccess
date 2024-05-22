import { current } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTest = createAsyncThunk(
  "test/getTest",
  async (id, { rejectWithValue }) => {
    try {
      console.log(`get test ${id}`);
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/assessments/${id}`,

        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const res = req.data;
      // console.log(res);
      return res;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error.response.data);
    }
  }
);

export const getTestResultPage = createAsyncThunk(
  "test/getTestResultPage",
  async (id, { rejectWithValue }) => {
    try {
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/studentDummy/get/test-details/${id}`,

        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      const res = req.data;

      console.log(res);

      return res.students;
    } catch (error) {
      console.log("catch", error.response.data);

      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllTests = createAsyncThunk(
  "test/getAllTests",
  async (_, { rejectWithValue, getState }) => {
    try {
      console.log(`get tests`);
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/assessments`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      const res = req.data;
      console.log(res);

      return res;
    } catch (error) {
      console.log("catch", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createTest = createAsyncThunk(
  "test/createTest",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/assessments/create`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const res = req.data;
      return res.assessment;
    } catch (error) {
      console.log("catch");
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteTest = createAsyncThunk(
  "test/deleteTest",
  async (id, { rejectWithValue }) => {
    try {
      console.log(`get test ${id}`);
      const req = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/assessments/${id}`,

        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const res = req.data;
      // console.log(res);

      return res;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error.response.data);
    }
  }
);
export const selectStudentTest = createAsyncThunk(
  "test/select",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/college/test/status/${data.testId}/${data.responseId}`,
        { status: data.status },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      console.log(response, "response");
      return response;
    } catch (error) {
      console.log(error, "error.message");
      return rejectWithValue(error.message);
    }
  }
);
export const getselectedStudents = createAsyncThunk(
  "test/getselectedStudents",
  async (id, { rejectWithValue }) => {
    try {
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/college/test/students/selected/${id}`,

        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      const res = req.data;

      console.log(res);

      return res.selectedStudents;
    } catch (error) {
      console.log("catch", error.response.data);

      return rejectWithValue(error.response.data);
    }
  }
);
