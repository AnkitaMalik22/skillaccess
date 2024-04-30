import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import {loadStripe} from '@stripe/stripe-js';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;



export const makePayment = createAsyncThunk(
    "payment/makePayment",
    async (data, { rejectWithValue }) => {
        try {
        const response = await axios.post(
            `${REACT_APP_API_URL}/api/payment/make-payment`,
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



export const getPayments = createAsyncThunk(
    "payment/getPayments",
    async (data, { rejectWithValue }) => {
        try {
        const response = await axios.get(
            `${REACT_APP_API_URL}/api/payment/get-all`,
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

export const getAllPlans = createAsyncThunk(
    "payment/getAllPlans",
    async (data, { rejectWithValue }) => {
        try {
        const response = await axios.get(
            `${REACT_APP_API_URL}/api/admin/all-plans`,
            {
              headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth-token"),
              },
            }
        );
      
        return response.data.plans;
        } catch (err) {
        return rejectWithValue(err.response.data);
        }
    }
    );

    export const getAllTransactions = createAsyncThunk(
        "payment/getAllTransactions ",
        async (data, { rejectWithValue }) => {
            try {
            const response = await axios.get(
                `${REACT_APP_API_URL}/api/admin/all-transactions`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token"),
                  },
                }
            );
          
            return response.data.transactions;
            } catch (err) {
            return rejectWithValue(err.response.data);
            }
        }
        );
export const selectAPlan = createAsyncThunk(
    "payment/selectAPlan",
    async (data, { rejectWithValue }) => {
        try {
        const response = await axios.post(
            `${REACT_APP_API_URL}/api/admin/select-plan/${data.planId}`,
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




export const paymentSlice = createSlice({
    initialState: {
        plans: [],
        payment: [],
        payments: [],
        transactions: [],
        status: null,
    },
    name: "payment",
    reducers: {
        setPayment: (state, { payload }) => {
            state.payment = payload;
        },
    },
    extraReducers : (builder) => {
        builder.addCase(makePayment.pending, (state, action) => {
            state.status = "loading";
            console.log("loading");
          
        });
        builder.addCase(makePayment.fulfilled, (state, { payload }) => {
            state.payment = payload;
            const stripe = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
            stripe.redirectToCheckout({
                sessionId: payload.id
            });
            toast.success("Payment Successful");
            state.status = "success";
        });
        builder.addCase(makePayment.rejected, (state, action) => {
            state.status = "failed";
        })
        builder.addCase(getPayments.pending, (state, action) => {
            state.status = "loading";
        }
        );
        builder.addCase(getPayments.fulfilled, (state, { payload }) => {
            console.log( payload.payments);
            state.payments = payload.payments;
            state.status = "success";
        });
        builder.addCase(getPayments.rejected, (state, action) => {
            state.status = "failed";
        })
        builder.addCase(getAllPlans.pending, (state, action) => {
            state.status = "loading";
        }
        );
        builder.addCase(getAllPlans.fulfilled, (state, { payload }) => {
            state.plans = payload;
            state.status = "success";
        });
        builder.addCase(getAllPlans.rejected, (state, action) => {
            state.status = "failed";
        })
        builder.addCase(selectAPlan.pending, (state, action) => {
            state.status = "loading";
        }
        );
        builder.addCase(selectAPlan.fulfilled, (state, { payload }) => {
            state.status = "success";
            toast.success("Plan selected successfully");
        });
        builder.addCase(selectAPlan.rejected, (state, action) => {
            state.status = "failed";
        })
        builder.addCase(getAllTransactions.pending, (state, action) => {
            state.status = "loading";
        }
        )
        builder.addCase(getAllTransactions.fulfilled, (state, { payload }) => {
            state.transactions = payload;
            console.log(payload);
            state.status = "success";
        });
        builder.addCase(getAllTransactions.rejected, (state, action) => {
            state.status = "failed";
        })

    },
});

export const { setPayment } = paymentSlice.actions;

export default paymentSlice.reducer;