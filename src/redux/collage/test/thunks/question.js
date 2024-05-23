import { current } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export const getRecentUsedQuestions = createAsyncThunk(
  "test/recentUsedQuestions",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.get(
        // `${REACT_APP_API_URL}/api/assessments/recent/questions`,
        `${REACT_APP_API_URL}/api/qb/recent/questions`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const res = req.data;
      console.log(res);
      return res.topics;
    } catch (error) {
      console.log("catch", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteRecentUsedQuestion = createAsyncThunk(
  "test/deleteRecentUsedQuestion",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.delete(
        `${REACT_APP_API_URL}/api/qb/recent/question/${data.id}?type=${data.type}`,
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

// ===================================== BOOKMARKS START =====================================

export const addBookmark = createAsyncThunk(
  "test/addBookmark",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/assessments/bookmarks/add`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const res = req.data;
      return res.bookmark;
    } catch (error) {
      console.log("catch", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeBookmark = createAsyncThunk(
  "test/removeBookmark",
  async (id, { rejectWithValue }) => {
    try {
      const req = await axios.delete(
        `${REACT_APP_API_URL}/api/assessments/bookmarks/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const res = req.data;
      return res.bookmarks;
    } catch (error) {
      console.log("catch", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllBookmarks = createAsyncThunk(
  "test/getAllBookmarks",
  async (_, { rejectWithValue }) => {
    try {
      const req = await axios.get(
        `${REACT_APP_API_URL}/api/assessments/get/bookmarks`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const res = req.data;
      return res.bookmarks;
    } catch (error) {
      console.log("catch", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getBookmarkById = createAsyncThunk(
  "test/getBookmarkById",
  async (id, { rejectWithValue }) => {
    try {
      const req = await axios.get(
        `${REACT_APP_API_URL}/api/college/bookmarks/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const res = req.data;
      return res.bookmark;
    } catch (error) {
      console.log("catch", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const editQuestionById = createAsyncThunk(
  "test/editQuestionById",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.put(
        `${REACT_APP_API_URL}/api/assessments/question/${data.id}?type=${data.type}`,
        data.question,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const res = req.data;
      return { res: res, index: data.index, type: data.type };
    } catch (error) {
      console.log("catch", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const editBankQuestionById = createAsyncThunk(
  "test/editBankQuestionById",
  async (data, { rejectWithValue }) => {
    console.log("ok");
    try {
      const req = await axios.put(
        `${REACT_APP_API_URL}/api/assessments/question/${data.id}?type=${data.type}`,
        data.question,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const res = req.data;
      return { res: res, type: data.type };
    } catch (error) {
      console.log("catch", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTopicByIdQB = createAsyncThunk(
  "test/getTopicByIdQB",
  async (id, { rejectWithValue }) => {
    try {
      const req = await axios.get(
        `${REACT_APP_API_URL}/api/assessment/section/${id}`,
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
