import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';


const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export const getCategories = createAsyncThunk(
    'category/getCategories',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${REACT_APP_API_URL}/api/admin/category/get`);
        console.log('API Response:', response.data);
        return response.data.categories || response.data; // Adjust based on your API response structure
      } catch (error) {
        console.error('API Error:', error);
        return rejectWithValue(error.response?.data || 'Failed to fetch categories');
      }
    }
  );
  
  const categorySlice = createSlice({
    name: 'category',
    initialState: {
      categories: [],
      status: 'idle',
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getCategories.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(getCategories.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.categories = action.payload.data;
          console.log('Categories updated in store:', action.payload);
          state.error = null;
        })
        .addCase(getCategories.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
          console.error('Categories fetch failed:', action.payload);
        });
    },
  }); 

  export default categorySlice.reducer;