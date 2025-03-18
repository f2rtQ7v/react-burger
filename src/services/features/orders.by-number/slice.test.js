import reducer, { getOrder, initialState } from './slice.ts';

describe('order by number test', () => {

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should be pending', () => {
    expect(reducer(initialState, getOrder.pending())).toEqual({
      ...initialState,
      request: true,
    });
  });

  it('should be rejected', () => {
    const error = { message: 'ERROR' };

    const action = getOrder.rejected(error);

    expect(reducer({ ...initialState, request: true }, action)).toEqual({
      ...initialState,
      error: error.message,
    });
  });

  it('should be fulfilled', () => {
    const order = {
      number: Math.random() * 1e5 | 0,
    };

    const action = getOrder.fulfilled({
      orders: [ order ],
    });

    expect(reducer({ ...initialState, request: true }, action)).toEqual({
      ...initialState,
      orders: {
        ...initialState.orders,
        [order.number]: order,
      },
    });
  });

});
