import { createSlice } from "@reduxjs/toolkit";

import { getResultGraph } from "./thunks/graph";

const initialState = {
  graph: {
    year: [
      { totalPlaced: 0, totalAppearedCount: 0 },
      { totalPlaced: 0, totalAppearedCount: 0 },
      { totalPlaced: 0, totalAppearedCount: 0 },
      { totalPlaced: 0, totalAppearedCount: 0 },
      { totalPlaced: 0, totalAppearedCount: 0 },
      { totalPlaced: 0, totalAppearedCount: 0 },
      { totalPlaced: 0, totalAppearedCount: 0 },
      { totalPlaced: 0, totalAppearedCount: 0 },
      { totalPlaced: 0, totalAppearedCount: 0 },
      { totalPlaced: 0, totalAppearedCount: 0 },
      { totalPlaced: 0, totalAppearedCount: 0 },
      { totalPlaced: 0, totalAppearedCount: 0 },
      { totalPlaced: 0, totalAppearedCount: 0 },
    ],
  },
};

const resultSlice = createSlice({
  initialState: initialState,
  name: "result",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getResultGraph.fulfilled, (state, action) => {
      action.payload.assessments.forEach((element, i) => {
        state.graph.year[element._id.month] = element;
      });
    });
  },
});

// export const {} = resultSlice.actions;

export default resultSlice.reducer;
