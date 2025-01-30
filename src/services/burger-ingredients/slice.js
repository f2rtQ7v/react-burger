import { createSlice, createSelector } from '@reduxjs/toolkit';
import { getIngredients } from './actions.js';

const initialState = {
  ingredients: null,
  ingredientsRequest: false,
  ingredientsError: null,
};

const slice = createSlice({
  name: 'burgerIngredients',
  initialState,
  selectors: {
    getIngredientsState: state => state,
    getIngredientsGroupedByType: createSelector(
      state => state.ingredients,
      ingredients => ingredients.reduce((acc, n) => (
        (acc[n.type] ??= []).push(n),
        acc
      ), {})
    ),
  },
  extraReducers: builder => builder
    .addCase(getIngredients.pending, (state) => {
      state.ingredientsRequest = true;
    })
    .addCase(getIngredients.rejected, (state, action) => {
      state.ingredientsRequest = false;
      state.ingredientsError = action.payload || action.error?.message || 'Неизвестная ошибка при загрузке списка ингредиентов';
    })
    .addCase(getIngredients.fulfilled, (state, action) => {
      state.ingredientsRequest = false;
      state.ingredients = action.payload.data;
    }),
});

export const { getIngredientsState, getIngredientsGroupedByType } = slice.selectors;
export default slice.reducer;
