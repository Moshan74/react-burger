import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { request } from '../utils/api';

export const createOrder = createAsyncThunk(
  'order/create',
  async (ingredientIds, { rejectWithValue }) => {
    try {
      const response = await request('/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: ingredientIds }),
      });
      return response.order.number;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    number: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.number = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
