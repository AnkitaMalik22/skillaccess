import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

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

export const getSelectedPlans = createAsyncThunk(
  "payment/getSelectedPlans",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/api/admin/selected-plans/:${data.planId}`,
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
        `${REACT_APP_API_URL}/api/admin/request-plan/${data.planId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      return response.data;
      console.log(response.data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const cancelAPlan = createAsyncThunk(
  "payment/cancelAPlan",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/admin/cancel-plan/${data.planId}`,
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
    selectPlan: null,
    select_loading: false,
    fetch_loading: false,
    cancel_loading: false,
  },
  name: "payment",
  reducers: {
    setPayment: (state, { payload }) => {
      state.payment = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(makePayment.pending, (state, action) => {
      state.status = "loading";
      console.log("loading");
    });
    builder.addCase(makePayment.fulfilled, (state, { payload }) => {
      state.payment = payload;
      const stripe = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
      stripe.redirectToCheckout({
        sessionId: payload.id,
      });
      toast.success("Payment Successful");
      state.status = "success";
    });
    builder.addCase(makePayment.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(getPayments.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getPayments.fulfilled, (state, { payload }) => {
      console.log(payload.payments);
      state.payments = payload.payments;
      state.status = "success";
    });
    builder.addCase(getPayments.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(getAllPlans.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getAllPlans.fulfilled, (state, { payload }) => {
      state.plans = payload;
      state.status = "success";
    });
    builder.addCase(getAllPlans.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(selectAPlan.pending, (state, action) => {
      state.status = "loading";
      state.select_loading = true;
      toast.loading("Plan request raised successfully");
    });
    builder.addCase(selectAPlan.fulfilled, (state, { payload }) => {
      state.status = "success";
      state.select_loading = false;
      toast.dismiss();
    });
    builder.addCase(selectAPlan.rejected, (state, action) => {
      state.status = "failed";
      state.select_loading = false;
      toast.error("Failed to raised the plan request. Please try again");
    });
    builder.addCase(getSelectedPlans.pending, (state, action) => {
      state.status = "loading";
      state.select_loading = true;
    });
    builder.addCase(getSelectedPlans.fulfilled, (state, { payload }) => {
      state.status = "success";
      state.selectPlan = payload;
      state.select_loading = false;
      toast.success("selected plan fetch successfully");
    });
    builder.addCase(getSelectedPlans.rejected, (state, action) => {
      state.status = "failed";
      state.select_loading = false;
      toast.error("Failed to fecth select plan");
    });
    builder.addCase(getAllTransactions.pending, (state, action) => {
      state.status = "loading";
      state.fetch_loading = true;
    });
    builder.addCase(getAllTransactions.fulfilled, (state, { payload }) => {
      state.transactions = payload;
      console.log(payload);
      state.status = "success";
      state.fetch_loading = false;
    });
    builder.addCase(getAllTransactions.rejected, (state, action) => {
      state.status = "failed";
      state.fetch_loading = false;
    });
    builder.addCase(cancelAPlan.pending, (state, action) => {
      state.status = "loading";
      state.cancel_loading = true;
      toast.loading("Please untill while we cancel the plan");
    });
    builder.addCase(cancelAPlan.fulfilled, (state, { payload }) => {
      state.status = "success";
      state.cancel_loading = false;
      toast.dismiss();
      toast.success("Plan cancelled successfully");
    });
    builder.addCase(cancelAPlan.rejected, (state, action) => {
      state.status = "failed";
      state.cancel_loading = false;
      toast.error("Failed to cancel plan");
    });
  },
});

export const { setPayment } = paymentSlice.actions;

export default paymentSlice.reducer;
