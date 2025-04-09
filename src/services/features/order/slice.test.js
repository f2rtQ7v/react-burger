import reducer, { createOrder, resetOrder, initialState } from './slice.ts';

describe('create order test', () => {

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should be pending', () => {
    expect(reducer(initialState, createOrder.pending())).toEqual({
      ...initialState,
      request: true,
    });
  });

  it('should be rejected', () => {
    const error = { message: 'ERROR' };

    const action = createOrder.rejected(error);

    expect(reducer({ ...initialState, request: true }, action)).toEqual({
      ...initialState,
      error: error.message,
    });
  });

  it('should be fulfilled', () => {
    const orderData = {
      name: 'order name',
      order: {
        number: Math.random() * 1e5 | 0,
      },
    };

    const action = createOrder.fulfilled(orderData);

    expect(reducer({ ...initialState, request: true }, action)).toEqual({
      ...initialState,
      order: {
        name: orderData.name,
        number: orderData.order.number,
      },
    });
  });

  it('should reset state', () => {
    const stateToReset = {
      boolean: false,
      number: 187,
      string: 'hello, world!!',
    };

    expect(reducer(stateToReset, resetOrder())).toEqual(initialState);
  });

});
