import { createAction, createReducer } from '@reduxjs/toolkit';

const baseWsUrl = 'wss://norma.nomoreparties.space';

export const ordersAllUrl = () =>
  `${baseWsUrl}/orders/all`;

export const ordersProfileUrl = () =>
  `${baseWsUrl}/orders?token=${localStorage.getItem('accessToken').replace('Bearer ', '')}`;

export enum WebsocketStatus {
  CONNECTING = 'CONNECTING',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export type TWebsocketOrders = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type TOrdersState = {
  status: WebsocketStatus;
  orders: TOrder[] | null;
  total: number;
  totalToday: number;
  error: string | null;
};

export function createOrdersActions(key) {
  return {
    connect: createAction<string, `${key}_CONNECT`>(`${key}_CONNECT`),
    disconnect: createAction(`${key}_DISCONNECT`),
    onConnecting: createAction(`${key}_CONNECTING`),
    onOpen: createAction(`${key}_ON_OPEN`),
    onClose: createAction(`${key}_ON_CLOSE`),
    onMessage: createAction<TWebsocketOrders, `${key}_ON_MESSAGE`>(`${key}_ON_MESSAGE`),
    onError: createAction<string, `${key}_ON_ERROR`>(`${key}_ON_ERROR`),
  };
}

export function createOrdersReducer(actions) {
  return createReducer({
    status: WebsocketStatus.OFFLINE,
    orders: null,
    total: 0,
    totalToday: 0,
    error: null,
  }, builder => builder
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
    })
  );
}
