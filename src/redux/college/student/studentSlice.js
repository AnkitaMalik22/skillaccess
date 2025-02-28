import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { getHeaders } from "../../../util/isCompany";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const initialState = {
  GET_UPLOAD_STUDENTS_LOADING: false,
  GET_PENDING_STUDENTS_LOADING: false,
  APPROVE_STUDENT_LOADING: false,
  GET_INVITED_STUDENTS_LOADING: false,
  REJECT_STUDENT_LOADING: false,
  uploadedStudents: [],
  invitedStudents: [],
  approvedStudents: [],
  pendingStudents: [],
  studentCV: [],
  pagination: {
    currentPage: 1,
    limit: 10,
    totalResponses: 21,
    totalPages: 3
},
  loading: false,
  error: false,
  GET_STUDENT_LOADING: false,
};

export const getStudents = createAsyncThunk(
  "student/getStudents",
  async (data, { rejectWithValue }) => {
    // console.log(data, "data");
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/api/college/${data?.id}/students?batch=${data?.batch}&filterType=${data?.filterType}&page=${data?.page}&limit=${data?.limit}`,
          getHeaders()
      );
      //console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const uploadStudents = createAsyncThunk(
  "student/uploadStudents",
  async (students, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/college/upload/students`,
        { students },
        getHeaders()
      );
      //console.log(response.data);
      return response.data;
    } catch (error) {
      //console.log(error, "error.message");
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);
export const approveStudent = createAsyncThunk(
  "student/approveStudent",
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/college/student/approve`,
        { studentId },
       getHeaders()
      );

      //console.log(response, "response");
      return response;
    } catch (error) {
      //console.log(error, "error.message");
      return rejectWithValue(error.message);
    }
  }
);

export const getStudentCV = createAsyncThunk(
  "student/studentCV",
  async ({studentId,page}, { rejectWithValue }) => {
    try {
      const req = await axios.get(
        `${REACT_APP_API_URL}/api/college/student/${studentId}?page=${page}`,
        
         getHeaders()
        
      );
      const res = req.data;
      //console.log(res);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const rejectRequest = createAsyncThunk(
  "student/reject",
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/college/student/reject/${studentId}`,
        {},
        getHeaders()
      );

      return response;
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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudents.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.GET_STUDENT_LOADING = true;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.uploadedStudents = action.payload.uploadedStudents;
        // state.invitedStudents = action.payload.invitedStudents;
        state.approvedStudents = action.payload.approvedStudents;
        state.pendingStudents = action.payload.pendingStudents;
       
        state.pagination.currentPage=action.payload.pagination.currentPage;
        state.pagination.totalPages = action.payload.pagination.totalPages;
        state.GET_STUDENT_LOADING = false;
      })
      .addCase(getStudents.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.GET_STUDENT_LOADING = false;
      })
      .addCase(uploadStudents.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.GET_UPLOAD_STUDENTS_LOADING = true;
      })
      .addCase(uploadStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        //console.log(action.payload, "action.payload");
        // getStudents();
        toast.success("Invitation(s) sent to student(s)");
        state.uploadedStudents = action.payload.uploadedStudents;
        state.GET_UPLOAD_STUDENTS_LOADING = false;
        // state.invitedStudents = action.payload.invitedStudents;
        // state.approvedStudents = action.payload.approvedStudents;
      })
      .addCase(uploadStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.GET_UPLOAD_STUDENTS_LOADING = false;
        //console.log("error", action.payload);
        toast.error(action.payload);
      })
      .addCase(approveStudent.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.APPROVE_STUDENT_LOADING = true;
      })
      .addCase(approveStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.APPROVE_STUDENT_LOADING = false;
        toast.success("Student Approved Successfully");
        getStudents();
        // window.location.replace("/college/students");
      })
      .addCase(approveStudent.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.APPROVE_STUDENT_LOADING = false;
        toast.error("An error occurred while approving the student");
      })
      .addCase(getStudentCV.pending, (state, action) => {
        state.status = "loading";
        state.GET_STUDENT_LOADING = true;
      })
      .addCase(getStudentCV.fulfilled, (state, action) => {
        state.studentCV = action.payload.student;
        console.log(action.payload, "action.payload");
        state.pagination = action.payload.pagination;
        state.GET_STUDENT_LOADING = false;
      })
      .addCase(getStudentCV.rejected, (state, action) => {
        state.status = "failed";
        state.GET_STUDENT_LOADING = false;
        state.error = action.error.message;
      })
      .addCase(rejectRequest.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.REJECT_STUDENT_LOADING = true;
      })
      .addCase(rejectRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        toast.success("Student Rejected Successfully");
        state.REJECT_STUDENT_LOADING = false;
        // window.location.replace("/college/students");
      })
      .addCase(rejectRequest.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.REJECT_STUDENT_LOADING = false;
        toast.error("An error occurred while rejecting the student");
      });
  },
});

export const {
  setUploadedStudents,
  setInvitedStudents,
  setApprovedStudents,
  setLoading,
} = studentSlice.actions;

export default studentSlice.reducer;
