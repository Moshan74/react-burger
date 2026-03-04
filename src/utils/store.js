import { configureStore } from '@reduxjs/toolkit';
import { fetchIngredients } from './ingredientsSlice';

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer
  }
});
