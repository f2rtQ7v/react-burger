import { createSlice, createSelector, nanoid } from '@reduxjs/toolkit';

interface IBurgerConstructorState {
  bun: IIngredient | null;
  fillings: IIngredient[];
}

export const initialState: IBurgerConstructorState = {
  bun: null,
  fillings: [],
};

const getState = (state: IBurgerConstructorState) => state;

const slice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    getIngredients: getState,
    getTotal: createSelector(
      getState,
      ({ bun, fillings }) =>
        fillings.reduce((acc, n) => acc + n.price, bun ? bun.price * 2 : 0)
    ),
    getCount: createSelector(
      getState,
      ({ bun, fillings }) =>
        fillings.reduce((acc, n) => (
          acc[n._id] = -~acc[n._id],
          acc
        ), bun ? { [bun._id]: 2 } : {})
    ),
  },
  reducers: {
    addIngredient: {
      prepare: (ingredient: IIngredient) => ({
        payload: {
          id: nanoid(),
          ...ingredient,
        },
      }),
      reducer(state, { payload: ingredient }: { payload: IIngredient }) {
        if (ingredient.type === 'bun') {
          state.bun = ingredient;
        } else {
          state.fillings.push(ingredient);
        }
      },
    },
    delIngredient(state, { payload: id }) {
      state.fillings = state.fillings.filter(n => n.id !== id);
    },
    moveIngredient({ fillings }, { payload: { newIndex, oldIndex } }) {
      fillings.splice(newIndex, 0, fillings.splice(oldIndex, 1)[0]);
    },
    resetConstructor: () => initialState,
  },
});

export const { getIngredients, getTotal, getCount } = slice.selectors;
export const { addIngredient, delIngredient, moveIngredient, resetConstructor } = slice.actions;
export default slice.reducer;
