import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  credit: 0,
};

export const getCreditDetails = createAsyncThunk(
  "test/getCreditDetails",
  async (id, { rejectWithValue }) => {
    try {
      console.log(`get test ${id}`);
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/admin/get-credit/${id}`,

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

const dummySlice = createSlice({
  name: "dummy",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCreditDetails.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getCreditDetails.fulfilled, (state, action) => {
        console.log(action.payload, "credit");
        state.credit = action.payload.credit;
      })
      .addCase(getCreditDetails.rejected, (state, action) => {
        console.error("Error fetching test results:", action.payload);
      });
  },
});

export default dummySlice.reducer;
