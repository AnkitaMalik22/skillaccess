import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getHeaders } from "../../../../util/isCompany";

export const getTest = createAsyncThunk(
  "test/getTest",
  async (id, { rejectWithValue }) => {
    try {
      //console.log(`get test ${id}`);
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/assessments/${id}`,

        getHeaders()
      );
      const res = req.data;
      // //console.log(res);
      return res;
    } catch (error) {
      //console.log(error);

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

        getHeaders()
      );

      const res = req.data;

      //console.log(res);

      return res.students;
    } catch (error) {
      //console.log("catch", error.response.data);

      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllTests = createAsyncThunk(
  "test/getAllTests",
  async (_, { rejectWithValue, getState }) => {
    try {
      //console.log(`get tests`);
      
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/assessments`,
        getHeaders()
      );

      const res = req.data;
      //console.log(res);

      return res;
    } catch (error) {
      //console.log("catch", error.response.data);
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
        getHeaders()
      );
      const res = req.data;
      return res.assessment;
    } catch (error) {
      //console.log("catch");
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteTest = createAsyncThunk(
  "test/deleteTest",
  async (id, { rejectWithValue }) => {
    try {
      //console.log(`get test ${id}`);
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
      // //console.log(res);

      return res;
    } catch (error) {
      //console.log(error);

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
        getHeaders()
      );

      //console.log(response, "response");
      return response;
    } catch (error) {
      //console.log(error, "error.message");
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
        getHeaders()
      );

      const res = req.data;

      //console.log(res);

      return res.selectedStudents;
    } catch (error) {
      //console.log("catch", error.response.data);

      return rejectWithValue(error.response.data);
    }
  }
);

export const getRecentTests = createAsyncThunk(
  "test/getRecentTests",
  async ({ skip, limit }, { rejectWithValue, getState }) => {
    try {
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/assessments/recent?skip=${skip}&limit=${limit}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      const res = req.data;
      //console.log(res);

      return res;
    } catch (error) {
      //console.log("catch", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const getRecentStudentTests = createAsyncThunk(
  "test/getRecentStudentTests",
  async (studentId, { rejectWithValue, getState }) => {
    try {
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/college/student/tests/${studentId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      const res = req.data;
      //console.log(res);

      return res.assessments;
    } catch (error) {
      //console.log("catch", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const removeFromRecent = createAsyncThunk(
  "test/removeFromRecent",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      //console.log(`get tests`);
      const req = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/assessments/recent/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      const res = req.data;

      dispatch(getRecentTests());
      return res;
    } catch (error) {
      //console.log("catch", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getStudentsForTest = createAsyncThunk(
  "test/getStudentsForTest",
  async ({testId,skip,limit,batch,search=""}, { rejectWithValue }) => {
    try {
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/assessments/students/${testId}?skip=${skip}&limit=${limit}&batch=${batch}&search=${search}`,
          getHeaders()
      );

      const res = req.data;

      //console.log(res);

      return res;
    } catch (error) {
      //console.log("catch", error.response.data);

      return rejectWithValue(error.response.data);
    }
  }
);
