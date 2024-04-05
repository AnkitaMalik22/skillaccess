import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;


export const addTeam = createAsyncThunk(
    "team/addTeam",
    async (data, { rejectWithValue }) => {
        try {
        const response = await axios.post(
            `${REACT_APP_API_URL}/api/college/teams/invite`,
            data,
            {
              headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth-token"),
              },
            }
        );
        return response.data;
        } catch (err) {
        return rejectWithValue(err.response.data);
        }
    }
    );

export const getInvitedTeams = createAsyncThunk(
    "team/getInvitedTeams",
    async (data, { rejectWithValue }) => {
        try {
        const response = await axios.get(
            `${REACT_APP_API_URL}/api/college/teams/invited`,
            {
                headers: {
                  "Content-Type": "application/json",
                  "auth-token": localStorage.getItem("auth-token"),
                },
              }
        );
        return response.data.team;
        } catch (err) {
        return rejectWithValue(err.response.data);
        }
    }
    );

    export const getRegisteredTeams = createAsyncThunk(
      "team/getRegisteredTeams",
      async (data, { rejectWithValue }) => {
          try {
          const response = await axios.get(
              `${REACT_APP_API_URL}/api/college/teams/`,
              {
                  headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token"),
                  },
                }
          );
          console.log(response.data.team);
          return response.data.team;
          } catch (err) {
          return rejectWithValue(err.response.data);
          }
      }
      );
  



    const teamSlice = createSlice({

        name: "team",
        initialState: {
          teams: [],
          approvedTeams: [],
          status: null,
          error: null,
          teamloading: false,
        },
        reducers:{
          setLoading: (state, action) => {
            state.teamloading= action.payload;
        }
        },
        extraReducers: (builder) => {
         builder.addCase(addTeam.pending, (state, action) => {
            state.status = "loading";
            state.teamloading = true;
          })
         .addCase(addTeam.fulfilled, (state, action) => {
            state.status = "success";
            state.teamloading = false;
            // state.teams = action.payload;
            toast.success("Team member added successfully");

          })
         .addCase(addTeam.rejected, (state, action) => {
            state.status = "failed";
            state.teamloading = false;
            state.error = action.payload;
            toast.error("Failed to add team member");
          })
         .addCase(getInvitedTeams.pending, (state, action) => {
            state.status = "loading";
          })
          .addCase(getInvitedTeams.fulfilled, (state, action) => {
            state.status = "success";
            state.teams = action.payload;
          })
         .addCase(getInvitedTeams.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
          })
          .addCase(getRegisteredTeams.pending, (state, action) => {
            state.status = "loading";
          })
          .addCase(getRegisteredTeams.fulfilled, (state, action) => {
            state.status = "success";
            state.approvedTeams = action.payload;
            console.log(action.payload, "approved teams", state.approvedTeams);
          })
          .addCase(getRegisteredTeams.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
          })
        },
        });

        export  const {setLoading} = teamSlice.actions;

        export default teamSlice.reducer;

    

