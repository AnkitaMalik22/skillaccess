import { createSlice } from "@reduxjs/toolkit";
import {current } from '@reduxjs/toolkit'
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";


const REACT_APP_API_URL = process.env.REACT_APP_API_URL;


const initialState = {
  uploadedStudents: [],
  invitedStudents: [],
  approvedStudents: [],
  pendingStudents: [],
    loading: false,
    error: false,
    };

export const getStudents = createAsyncThunk(
    "student/getStudents",
    async (id, { rejectWithValue }) => {
        try {
        const response = await axios.get(`${REACT_APP_API_URL}/api/college/${id.id}/students`,
        {
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        return response.data;
        } catch (error) {
        return rejectWithValue(error.message);
        }
    }
    );

export const uploadStudents = createAsyncThunk( 
    "student/uploadStudents",
    async (students, { rejectWithValue }) => {
        console.log(students, "students");
        try {
        const response = await axios.post(`${REACT_APP_API_URL}/api/college/upload/students`, 
        {students},
        {
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("auth-token"),
            },
          },);
        return response.data;
        } catch (error) {
            console.log(error, "error.message");
        return rejectWithValue(error?.response?.data?.message);
        }
    }
    );
export const approveStudent = createAsyncThunk(
    "student/approveStudent",
    async (studentId, { rejectWithValue }) => {
        try {
        const response = await axios.post(`${REACT_APP_API_URL}/api/college/student/approve`, 
        {studentId },
        {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token"),
                },
            },);

            console.log(response, "response");
        return response;
        } catch (error) {
                console.log(error, "error.message");
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
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStudents.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getStudents.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.uploadedStudents = action.payload.uploadedStudents;
                state.invitedStudents = action.payload.invitedStudents;
                state.approvedStudents = action.payload.approvedStudents;
                state.pendingStudents = action.payload.pendingStudents;
            })
            .addCase(getStudents.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(uploadStudents.pending, (state) => {
                state.loading = true;
                state.error = false;
        

            })
            .addCase(uploadStudents.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                console.log(action.payload, "action.payload");
                getStudents();
                toast.success("Students Uploaded Successfully");
                // state.uploadedStudents = action.payload.uploadedStudents;
                // state.invitedStudents = action.payload.invitedStudents;
                // state.approvedStudents = action.payload.approvedStudents;
            })
            .addCase(uploadStudents.rejected, (state,action) => {
                state.loading = false;
                state.error = true;
                console.log("error",action.payload);
                toast.error(action.payload);
            })
            .addCase(approveStudent.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(approveStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
             toast.success("Student Approved Successfully");
                getStudents();
            })
            .addCase(approveStudent.rejected, (state) => {
                state.loading = false;
                state.error = true;
                toast.error("An error occurred while approving the student");
            });

    },
});



export const { setUploadedStudents, setInvitedStudents, setApprovedStudents ,setLoading} = studentSlice.actions;

export default studentSlice.reducer;