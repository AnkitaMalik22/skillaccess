import { createSlice } from "@reduxjs/toolkit";

import { getAssessmentOverview, getResultGraph } from "./thunks/graph";

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
  overviewLoading: true,
  overview: [
    {
      name: "",
      data: [0],
    },
    {
      name: "Candidates Appeared",
      data: [0],
    },
    {
      name: "Approved Candidates",
      data: [0],
    },
    {
      name: "Disapproved Candidates",
      data: [0],
    },
    {
      name: "Absent",
      data: [0],
    },
    {
      name: "",
      data: [0],
    },
  ],
};

const resultSlice = createSlice({
  initialState: initialState,
  name: "result",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getResultGraph.fulfilled, (state, action) => {
        action.payload.assessments.forEach((element, i) => {
          state.graph.year[element._id.month - 1] = element;
        });
      })
      .addCase(getAssessmentOverview.fulfilled, (state, action) => {
        action.payload.overview.forEach((result, index) => {
          // index  = day (starts from 0 )
          state.overview[1].data[index] =
            result.pending + result.selected + result.rejected;
          state.overview[2].data[index] = result.selected;
          state.overview[3].data[index] = result.rejected;
          state.overview[4].data[index] = result.absent;
          state.overviewLoading = false;
        });
      });
  },
});

// export const {} = resultSlice.actions;

export default resultSlice.reducer;
