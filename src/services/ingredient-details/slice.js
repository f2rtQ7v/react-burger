import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeIngredient: null,
};

const slice = createSlice({
  name: 'ingredientDetails',
  initialState,
  selectors: {
    getActiveIngredient: state => state.activeIngredient,
  },
  reducers: {
    setActiveIngredient(state, action) {
      state.activeIngredient = action.payload;
    },
  },
});

export const { getActiveIngredient } = slice.selectors;
export const { setActiveIngredient } = slice.actions;
export default slice.reducer;
