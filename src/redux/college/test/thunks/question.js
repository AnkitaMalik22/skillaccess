import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getHeaders } from "../../../../util/isCompany";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export const getRecentUsedQuestions = createAsyncThunk(
  "test/recentUsedQuestions",
  async (data, { rejectWithValue }) => {
    try {
      const req = await axios.get(
        // `${REACT_APP_API_URL}/api/assessments/recent/questions`,
        `${REACT_APP_API_URL}/api/qb/recent/questions`,
      getHeaders()
      );
      const res = req.data;
      //console.log(res);
      return res.topics;
    } catch (error) {
      //console.log("catch", error.response.data);
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
       getHeaders()
      );
      const res = req.data;
      return res.topics;
    } catch (error) {
      //console.log("catch", error.response.data);
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
       getHeaders()
      );
      const res = req.data;
      return res.bookmark;
    } catch (error) {
      //console.log("catch", error.response.data);
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
        getHeaders()
      );
      const res = req.data;
      return res.bookmarks;
    } catch (error) {
      //console.log("catch", error.response.data);
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
       getHeaders()
      );
      const res = req.data;
      return res.bookmarks;
    } catch (error) {
      //console.log("catch", error.response.data);
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
        getHeaders()
      );
      const res = req.data;
      return res.bookmark;
    } catch (error) {
      //console.log("catch", error.response.data);
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
        getHeaders()
      );
      const res = req.data;
      return { res: res, index: data.index, type: data.type };
    } catch (error) {
      //console.log("catch", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const editBankQuestionById = createAsyncThunk(
  "test/editBankQuestionById",
  async (data, { rejectWithValue }) => {
    //console.log("ok");
    try {
      const req = await axios.put(
        `${REACT_APP_API_URL}/api/assessments/question/${data.id}?type=${data.type}`,
        data.question,
        getHeaders()
      );
      const res = req.data;
      return { res: res, type: data.type };
    } catch (error) {
      //console.log("catch", error.response.data);
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
        getHeaders()
      );
      const res = req.data;
      return res.section;
    } catch (error) {
      //console.log("catch", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
