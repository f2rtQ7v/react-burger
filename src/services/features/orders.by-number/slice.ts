import { createSlice } from '@reduxjs/toolkit';
import { getOrder } from './actions.ts';
import createRequestState from '../../../utils/create-request-state.ts';

interface IOrdersState extends IRequestState {
  orders: Record<string, IOrder>;
}

const initialState = createRequestState<IOrdersState>({ orders: {} });

const slice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    getOrderState: state => state,
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

export const { getOrderState } = slice.selectors;
export default slice.reducer;
