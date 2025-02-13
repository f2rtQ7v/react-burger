import { createSlice, createSelector } from '@reduxjs/toolkit';
import { getIngredients } from './actions.ts';

interface IBurgerIngredientsState extends IRequestState {
  ingredients: IIngredient[] | null;
}

const initialState: IBurgerIngredientsState = {
  ingredients: null,
  request: false,
  error: null,
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
  reducers: {},
  extraReducers: builder => builder
    .addCase(getIngredients.pending, (state) => {
      state.request = true;
      state.error = null;
    })
    .addCase(getIngredients.rejected, (state, action) => {
      state.request = false;
      state.error = action.error?.message || 'Неизвестная ошибка при загрузке списка ингредиентов';
    })
    .addCase(getIngredients.fulfilled, (state, action) => {
      state.request = false;
      state.ingredients = action.payload.data;
    }),
});

export const { getIngredientsState, getIngredientsGroupedByType } = slice.selectors;
export default slice.reducer;
