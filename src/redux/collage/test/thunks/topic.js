import { current } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addQuestionToTopic = createAsyncThunk(
  "test/addQuestionToTopic",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      let req;
      if (data.isMultiple === true) {
        req = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/college/add-questions/${data.id}/${data.type}`,
          { questions: data.data },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
      } else {
        req = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/college/add-questions/${data.id}/${data.type}`,
          { questions: [data.data] },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
      }

      const res = req.data;

      // if (data.index) return { question: res.questions[0] };
      return {
        questions: res.questions,
        type: data.type,
        isMultiple: data.isMultiple,
      };
    } catch (error) {
      console.log("catch");
      return rejectWithValue(error?.response?.data?.message || "");
    }
  }
);

export const getAllTopics = createAsyncThunk(
  "test/getAllTopics",
  async (data, { rejectWithValue, getState }) => {
    try {
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/college/topics/all?level=${data.level}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const res = req.data;
      return res.topics;
    } catch (error) {
      console.log("catch", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const getAllTopicsQB = createAsyncThunk(
  "test/getAllTopicsQB",
  async (data, { rejectWithValue, getState }) => {
    try {
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/qb/topics/all`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const res = req.data;
      return res.topics;
    } catch (error) {
      console.log("catch", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTopicById = createAsyncThunk(
  "test/getTopicById",
  async (id, { rejectWithValue }) => {
    try {
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/admin/topic/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const res = req.data;
      // console.log("res", res);
      return res.section;
    } catch (error) {
      console.log("catch", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteTopics = createAsyncThunk(
  "test/deleteTopics",
  async (data, { rejectWithValue }) => {
    try {
      console.log("data", data)
      const req = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/assessments/sections`,
        {data},
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const res = req.data;
      // console.log("res", res);
      return res.sections;
    } catch (error) {
      console.log("catch", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createTopic = createAsyncThunk(
  "test/createTopic",

  async (data, { rejectWithValue }) => {
    //   {

    //     "Heading": "DevOps 5",

    //     "Description": "The DevOps test assesses candidates' knowledge of DevOps concepts and practices and whether they can apply that knowledge to improve infrastructure, achieve faster time to market, and lower failure rates of new releases.",

    //     "Time": 10,

    //     "TotalQuestions": 10

    // }

    try {
      const req = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/college/topics/create`,

        data,

        {
          headers: {
            "Content-Type": "application/json",

            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      const res = req.data;

      return res.section;
    } catch (error) {
      console.log("catch", error.response.data);

      return rejectWithValue(error.response.data);
    }
  }
);
