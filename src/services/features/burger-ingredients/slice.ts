import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import createRequestState from '../../../utils/create-request-state.ts';
import { getIngredientsRequest } from '../../../utils/api.ts';

interface IBurgerIngredientsState extends IRequestState {
  ingredients: IIngredient[] | null;
  ingredientsMap: Record<string, IIngredient>;
}

export const getIngredients = createAsyncThunk('burgerIngredients/get', getIngredientsRequest);

export const initialState = createRequestState<IBurgerIngredientsState>({
  ingredients: null,
  ingredientsMap: {},
});

const slice = createSlice({
  name: 'burgerIngredients',
  initialState,
  selectors: {
    getIngredientsState: state => state,
    getIngredientsGroupedByType: createSelector(
      state => state.ingredients,
      ingredients => ingredients.reduce((acc: { [key: string]: IIngredient[] }, n: IIngredient) => (
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
    .addCase(getIngredients.fulfilled, (state, { payload: { data } }) => {
      state.request = false;
      state.ingredients = data;
      state.ingredientsMap = Object.fromEntries(data.map((n: IIngredient) => [ n._id, n ]));
    }),
});

export const { getIngredientsState, getIngredientsGroupedByType } = slice.selectors;
export default slice.reducer;
