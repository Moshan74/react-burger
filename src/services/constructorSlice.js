import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const constructorSlice = createSlice({
  name: 'constructor',
  initialState: {
    bun: null,
    ingredients: [],
  },
  reducers: {
    addIngredient: (state, action) => {
      const ingredient = {
        ...action.payload,
        id: nanoid(),
      };
      if (action.payload.type === 'bun') {
        state.bun = ingredient;
      } else {
        state.ingredients.push(ingredient);
      }
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter((item) => item.id !== action.payload);
    },
    moveIngredient: (state, action) => {
      const { dragIndex, hoverIndex } = action.payload;
      const draggedItem = state.ingredients[dragIndex];
      state.ingredients.splice(dragIndex, 1);
      state.ingredients.splice(hoverIndex, 0, draggedItem);
    },
  },
});

export const { addIngredient, removeIngredient, moveIngredient } =
  constructorSlice.actions;
export default constructorSlice.reducer;
