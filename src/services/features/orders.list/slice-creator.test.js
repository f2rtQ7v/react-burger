import { WebsocketStatus, createOrdersSlice } from './slice-creator.ts';

const { reducer, actions, initialState } = createOrdersSlice('testSlice', '');

describe('all orders test', () => {

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should be connecting', () => {
    expect(reducer(initialState, actions.onConnecting())).toEqual({
      ...initialState,
      status: WebsocketStatus.CONNECTING,
    });
  });

  it('should be online', () => {
    expect(reducer(initialState, actions.onOpen())).toEqual({
      ...initialState,
      status: WebsocketStatus.ONLINE,
    });
  });

  it('should be offline', () => {
    expect(reducer(initialState, actions.onClose())).toEqual({
      ...initialState,
      status: WebsocketStatus.OFFLINE,
    });
  });

  it('should return orders data', () => {
    const ordersData = {
      orders: Array.from({ length: 3 }, (_, i) => ({
        _id: `order${i + 1}`,
      })),
      total: 3,
      totalToday: 1,
    };

    expect(reducer(initialState, actions.onMessage(ordersData))).toEqual({
      ...initialState,
      ...ordersData,
    });
  });

  it('should return error', () => {
    const error = 'ERROR';

    expect(reducer(initialState, actions.onError(error))).toEqual({
      ...initialState,
      error,
    });
  });

});
