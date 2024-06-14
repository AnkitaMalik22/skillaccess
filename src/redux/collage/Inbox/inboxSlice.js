import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getMail } from "../auth/authSlice";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const initialState = {
  bookMarks: "",
};

export const bookmarkMail = createAsyncThunk(
  "inbox/bookmarkMail",
  async (mailId, { rejectWithValue }) => {
    try {
      const req = await axios.post(
        `${REACT_APP_API_URL}/api/college/inbox/bookmark/${mailId}`,
        {},
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
          withCredentials: true,
        }
      );
      const res = req.data;
      return res.data;
    } catch (error) {
      console.log("catch");
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeBookmarkedMail = createAsyncThunk(
  "inbox/removeBookmarkMail",
  async (mailId, { rejectWithValue }) => {
    try {
      const req = await axios.delete(
        `${REACT_APP_API_URL}/api/college/inbox/bookmark/${mailId}`,

        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
          withCredentials: true,
        }
      );
      const res = req.data;
      return res.data;
    } catch (error) {
      console.log("catch");
      return rejectWithValue(error.response.data);
    }
  }
);
// /api/college/inbox/seen/664c6f510aa286aba8a88f86?type=Received

export const markAsRead = createAsyncThunk(
  "inbox/markAsRead",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const req = await axios.put(
        `${REACT_APP_API_URL}/api/college/inbox/seen/${data.id}?type=${data.type}`,
        {},
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
          withCredentials: true,
        }
      );
      const res = req.data;
      dispatch(getMail());

      return res.data;
    } catch (error) {
      console.log("catch");
      return rejectWithValue(error.response.data);
    }
  }
);

const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookmarkMail.pending, (state, action) => {
        console.log("bookmarkload");
      })
      .addCase(bookmarkMail.fulfilled, (state, action) => {
        console.log("bookmarkf", action.payload);
      })
      .addCase(bookmarkMail.rejected, (state, action) => {
        console.log("bookmarkr", action.payload);
      })
      .addCase(removeBookmarkedMail.pending, (state, action) => {
        console.log("removebookmarkload");
      })
      .addCase(removeBookmarkedMail.fulfilled, (state, action) => {
        console.log("removebookmarkf", action.payload);
      })
      .addCase(removeBookmarkedMail.rejected, (state, action) => {
        console.log("removebookmarkr", action.payload);
      });
  },
});
export default inboxSlice;
