import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { request } from '../utils/api';

export const createOrder = createAsyncThunk('order/create', async (ingredientIds) => {
  const response = await request('/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients: ingredientIds }),
  });

  return response; // Возвращаем полный ответ сервера
});

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    loading: false,
    status: 'idle',
    number: null,
    error: null,
    orderData: null, // Полный ответ сервера
  },
  reducers: {
    resetOrder: (state) => {
      state.loading = false;
      state.status = 'idle';
      state.number = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.number = null;
        state.error = null;
        console.log('createOrder.pending', state);
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.number = action.payload.order?.number || action.payload.number;
        state.error = null;
        state.orderData = action.payload; // Полный ответ сервера
        console.log('createOrder.fulfilled', state, action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = 'failed';
        console.log('createOrder.rejected', state, action.payload);
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
