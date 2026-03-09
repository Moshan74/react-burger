import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { request } from '../utils/api';

export const fetchIngredients = createAsyncThunk('ingredients/fetchAll', async () => {
  const data = await request('/ingredients');
  return data.data;
});

const isRejectedAction = (action) => action.type.endsWith('rejected');

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.error = action.error?.message ?? 'Unknown error';
        state.loading = false;
      });
  },
});

export default ingredientsSlice.reducer;
