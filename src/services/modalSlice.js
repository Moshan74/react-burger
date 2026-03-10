import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    selectedIngredient: null,
    visibleModalIngredient: false,
  },
  reducers: {
    openModal: (state, action) => {
      state.selectedIngredient = action.payload;
      state.visibleModalIngredient = true;
    },
    closeModal: (state) => {
      state.selectedIngredient = null;
      state.visibleModalIngredient = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
