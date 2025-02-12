import { createSlice, createSelector } from '@reduxjs/toolkit';
import { getIngredients } from './actions.ts';

interface IBurgerIngredientsState {
  ingredients: IIngredient[] | null;
  ingredientsRequest: boolean;
  ingredientsError: string | null;
}

const initialState: IBurgerIngredientsState = {
  ingredients: null,
  ingredientsRequest: false,
  ingredientsError: null,
};

const slice = createSlice({
  name: 'burgerIngredients',
  initialState,
  selectors: {
    getIngredientsState: (state: IBurgerIngredientsState): IBurgerIngredientsState => state,
    getIngredientsGroupedByType: createSelector(
      state => state.ingredients,
      ingredients => ingredients.reduce((acc: IGroupedIngredients, n: IIngredient) => (
        (acc[n.type] ??= []).push(n),
        acc
      ), {})
    ),
  },
  extraReducers: builder => builder
    .addCase(getIngredients.pending, (state) => {
      state.ingredientsRequest = true;
      state.ingredientsError = null;
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
