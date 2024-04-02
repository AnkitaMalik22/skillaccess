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
            `${REACT_APP_API_URL}/api/college/teams/add`,
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

export const getTeams = createAsyncThunk(
    "team/getTeams",
    async (data, { rejectWithValue }) => {
        try {
        const response = await axios.get(
            `${REACT_APP_API_URL}/api/college/teams`,
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



    const teamSlice = createSlice({

        name: "team",
        initialState: {
          teams: [],
          status: null,
          error: null,
        },
        extraReducers: (builder) => {
         builder.addCase(addTeam.pending, (state, action) => {
            state.status = "loading";
          })
         .addCase(addTeam.fulfilled, (state, action) => {
            state.status = "success";
            // state.teams = action.payload;
            toast.success("Team member added successfully");
          })
         .addCase(addTeam.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
            toast.error("Failed to add team member");
          })
         .addCase(getTeams.pending, (state, action) => {
            state.status = "loading";
          })
          .addCase(getTeams.fulfilled, (state, action) => {
            state.status = "success";
            state.teams = action.payload;
          })
         .addCase(getTeams.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
          });
        },
        });

        export default teamSlice.reducer;

    

