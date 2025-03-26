import { createAction, createSlice } from '@reduxjs/toolkit';

const baseOrdersUrl = 'wss://norma.nomoreparties.space/orders';

export enum WebsocketStatus {
  CONNECTING = 'CONNECTING',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export type TWebsocketOrders = {
  success: boolean;
  orders: IOrder[];
  total: number;
  totalToday: number;
};

export type TOrdersState = {
  status: WebsocketStatus;
  orders: IOrder[] | null;
  total: number;
  totalToday: number;
  error: string | null;
};

export function createOrdersActions(key: string) {
  const CONNECT = `${key}_CONNECT`;
  const ON_MESSAGE = `${key}_ON_MESSAGE`;
  const ON_ERROR = `${key}_ON_ERROR`;

  return {
    connect: createAction<string, typeof CONNECT>(CONNECT),
    disconnect: createAction(`${key}_DISCONNECT`),
    onConnecting: createAction(`${key}_CONNECTING`),
    onOpen: createAction(`${key}_ON_OPEN`),
    onClose: createAction(`${key}_ON_CLOSE`),
    onMessage: createAction<TWebsocketOrders, typeof ON_MESSAGE>(ON_MESSAGE),
    onError: createAction<string, typeof ON_ERROR>(ON_ERROR),
  };
}

export type TOrdersActions = ReturnType<typeof createOrdersActions>;

export function createOrdersState(): TOrdersState {
  return {
    status: WebsocketStatus.OFFLINE,
    orders: null,
    total: 0,
    totalToday: 0,
    error: null,
  };
}

export function createOrdersSlice(name: string, url: () => string) {
  const actions = createOrdersActions(name);
  const initialState = createOrdersState();
  const getUrl = () => baseOrdersUrl + url();

  const slice = createSlice({
    name,
    initialState,
    reducers: {},
    selectors: {
      getState: state => state,
    },
    extraReducers: builder => builder
      .addCase(actions.onConnecting, (state) => {
        state.status = WebsocketStatus.CONNECTING;
      })
      .addCase(actions.onOpen, (state) => {
        state.status = WebsocketStatus.ONLINE;
      })
      .addCase(actions.onClose, (state) => {
        state.status = WebsocketStatus.OFFLINE;
      })
      .addCase(actions.onMessage, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(actions.onError, (state, action) => {
        state.error = action.payload;
      }),
  });

  const { reducer, selectors: { getState } } = slice;

  return { name, initialState, actions, reducer, getState, getUrl };
}

export type TOrdersSlice = ReturnType<typeof createOrdersSlice>;
