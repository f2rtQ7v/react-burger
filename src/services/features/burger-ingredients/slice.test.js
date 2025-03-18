import reducer, { getIngredients, initialState } from './slice.ts';

describe('burger ingredients test', () => {

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should be pending', () => {
    expect(reducer(initialState, getIngredients.pending())).toEqual({
      ...initialState,
      request: true,
    });
  });

  it('should be rejected', () => {
    const error = { message: 'ERROR' };

    const action = getIngredients.rejected(error);

    expect(reducer({ ...initialState, request: true }, action)).toEqual({
      ...initialState,
      error: error.message,
    });
  });

  it('should be fulfilled', () => {
    const ingredients = Array.from({ length: 5 }, (_, i) => ({
      _id: i + 1,
    }));

    const action = getIngredients.fulfilled({
      data: ingredients,
    });

    expect(reducer({ ...initialState, request: true }, action)).toEqual({
      ...initialState,
      ingredients,
      ingredientsMap: ingredients.reduce((acc, n) => (acc[n._id] = n, acc), {}),
    });
  });

});
