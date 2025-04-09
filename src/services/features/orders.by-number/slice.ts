import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import createRequestState from '../../../utils/create-request-state.ts';
import { getOrderRequest } from '../../../utils/api.ts';

interface IOrdersState extends IRequestState {
  orders: Record<string, IOrder>;
}

export const getOrder = createAsyncThunk('order/get', getOrderRequest);

export const initialState = createRequestState<IOrdersState>({ orders: {} });

const slice = createSlice({
  name: 'ordersByNumber',
  initialState,
  reducers: {},
  selectors: {
    getOrdersState: state => state,
  },
  extraReducers: builder => builder
    .addCase(getOrder.pending, (state) => {
      state.request = true;
      state.error = null;
    })
    .addCase(getOrder.rejected, (state, action) => {
      state.request = false;
      state.error = action.error?.message || 'Неизвестная ошибка при получении заказа';
    })
    .addCase(getOrder.fulfilled, (state, action) => {
      state.request = false;
      const [ order ] = action.payload.orders;
      if (order) {
        state.orders[order.number] = order;
      } else {
        state.error = 'Заказ не найден';
      }
    }),
});

export const { getOrdersState } = slice.selectors;
export default slice.reducer;
