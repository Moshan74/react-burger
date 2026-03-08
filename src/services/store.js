import { configureStore } from '@reduxjs/toolkit';

import ingredientsReducer from './ingredientsSlice';
import modalReducer from './modalSlice';
import orderReducer from './orderSlice';

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    modal: modalReducer,
    order: orderReducer,
  },
});
