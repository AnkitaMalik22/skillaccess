import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getCookie from "../../../../util/getToken";




export const addTestToJob = createAsyncThunk(
    "test/addTestToJob",
    async (data, { rejectWithValue }) => {
        try {
        const req = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/company/jobs/add-test/${data.jobId}/${data.testId}`,
            data,
            {
            headers: {
                "auth-token": getCookie("token"),
            },
            }
        );
        const res = req.data;
        return res;
        } catch (error) {
        return rejectWithValue(error.response.data);
        }
    }
    );