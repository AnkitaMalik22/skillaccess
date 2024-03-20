import { createSlice } from "@reduxjs/toolkit";
import {current } from '@reduxjs/toolkit'
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  uploadedStudents: [],
  invitedStudents: [],
  approvedStudents: [],
    loading: false,
    error: false,
    };

export const getStudents = createAsyncThunk(
    "student/getStudents",
    async (id, { rejectWithValue }) => {
        try {
        const response = await axios.get(`/api/collage/${id}/students`);
        return response.data;
        } catch (error) {
        return rejectWithValue(error.message);
        }
    }
    );

export const uploadStudents = createAsyncThunk( 
    "student/uploadStudents",
    async (data, { rejectWithValue }) => {
        try {
        const response = await axios.post(`/api/collage/upload/students`, data);
        return response.data;
        } catch (error) {
        return rejectWithValue(error.message);
        }
    }
    );


export const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        setUploadedStudents: (state, action) => {
            state.uploadedStudents = action.payload;
        },
        setInvitedStudents: (state, action) => {
            state.invitedStudents = action.payload;
        },
        setApprovedStudents: (state, action) => {
            state.approvedStudents = action.payload;
        },
    },
    extraReducers: {
        [getStudents.pending]: (state) => {
            state.loading = true;
            state.error = false;
        },
        [getStudents.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = false;
            state.uploadedStudents = action.payload.uploadedStudents;
            state.invitedStudents = action.payload.invitedStudents;
            state.approvedStudents = action.payload.approvedStudents;
        },
        [getStudents.rejected]: (state) => {
            state.loading = false;
            state.error = true;
        },
        [uploadStudents.pending]: (state) => {
            state.loading = true;
            state.error = false;
        },
        [uploadStudents.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = false;
            console.log(action.payload, "action.payload");
            // state.uploadedStudents = action.payload.uploadedStudents;
            // state.invitedStudents = action.payload.invitedStudents;
            // state.approvedStudents = action.payload.approvedStudents;
        },
        [uploadStudents.rejected]: (state) => {
            state.loading = false;
            state.error = true;
        },

    },
});
