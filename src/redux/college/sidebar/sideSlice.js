import { createSlice } from "@reduxjs/toolkit";

const sideSlice = createSlice({
  name: "side",
  initialState: {
    selected: 0,
  },
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const selected = (state) => state.side.selected;

export const { setSelected } = sideSlice.actions;

export default sideSlice.reducer;
