import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getCookie from "../../../../util/getToken";

export const getTestCompany = createAsyncThunk(
  "companyTest/getTest",
  async (id, { rejectWithValue }) => {
    try {
      console.log(`get test ${id}`);
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/company/test/${id}`,

        {
          headers: {
             "auth-token":getCookie("token")
          },
      }
      );
      const res = req.data;
      console.log(res);
      return res;
    } catch (error) {
      //console.log(error);

      return rejectWithValue(error.response.data);
    }
  }
);

export const getTestResultPageCompany = createAsyncThunk(
  "test/getTestResultPage",
  async (id, { rejectWithValue }) => {
    try {
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/company/studentDummy/get/test-details/${id}`,

        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": getCookie("token"),
          },
        }
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
  async (withJob, { rejectWithValue, getState }) => {
    try {
      //console.log(`get tests`);
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/company/test/get-all?withJob=${withJob||false}&withCampusDrive=${withJob||false}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": getCookie("token"),
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


export const createTestCompany = createAsyncThunk(
  "companyTest/createTest",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/company/test/create`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": getCookie("token"),
          },
        }
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
            "auth-token": getCookie("token"),
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
export const selectStudentTestCompany = createAsyncThunk(
  "companyTest/select",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/company/test/status/${data.testId}/${data.responseId}`,
        { status: data.status },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": getCookie("token"),
          },
        }
      );

      //console.log(response, "response");
      return response;
    } catch (error) {
      //console.log(error, "error.message");
      return rejectWithValue(error.message);
    }
  }
);
export const getselectedStudentsCompany = createAsyncThunk(
  "test/getselectedStudents",
  async (id, { rejectWithValue }) => {
    try {
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/company/test/students/selected/${id}`,

        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": getCookie("token"),
          },
        }
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
            "auth-token": getCookie("token"),
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
            "auth-token": getCookie("token"),
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
            "auth-token": getCookie("token"),
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
  async (testId, { rejectWithValue }) => {
    try {
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/company/test/students/${testId}`,

        {
          headers: {
             "auth-token":getCookie("token")
          },
      }
      );

      const res = req.data;

      console.log(res);

      return res;
    } catch (error) {
      //console.log("catch", error.response.data);

      return rejectWithValue(error.response.data);
    }
  }
);
