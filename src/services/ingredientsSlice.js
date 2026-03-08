import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { request } from '../utils/api';

export const fetchIngredients = createAsyncThunk('ingredients/fetchAll', async () => {
  console.log('createAsyncThunk...');
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
    console.log('extraReducers builder ...', builder);
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        console.log('pending... state', state);
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        console.log('fulfilled...state', state);
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log('rejected...state', state);
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.error = action.error?.message ?? 'Unknown error';
        state.loading = false;
        console.log('isRejectedAction...state', state);
      });
  },
});

export default ingredientsSlice.reducer;
