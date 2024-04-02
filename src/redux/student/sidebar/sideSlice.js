import { createSlice } from "@reduxjs/toolkit";

const studentSideSlice = createSlice({
  name: "studentSide",
  initialState: {
    selected: localStorage.getItem("StudentSide")
      ? JSON.parse(localStorage.getItem("StudentSide"))
      : "",
  },
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload;
      localStorage.setItem("StudentSide", JSON.stringify(action.payload));
    },
  },
});

export const selectedStudent = (state) => state.studentSide.selected;

export const { setSelected } = studentSideSlice.actions;

export default studentSideSlice.reducer;
