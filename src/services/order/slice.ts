import { createSlice } from '@reduxjs/toolkit';
import { createOrder } from './actions.ts';

interface IOrderState {
  order: IOrder | null;
  orderCreateRequest: boolean;
  orderCreateError: string | null;
}

const initialState: IOrderState = {
  order: null,
  orderCreateRequest: false,
  orderCreateError: null,
};

const slice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: () => initialState,
  },
  selectors: {
    getOrderState: state => state,
  },
  extraReducers: builder => builder
    .addCase(createOrder.pending, (state) => {
      state.orderCreateRequest = true;
      state.orderCreateError = null;
    })
    .addCase(createOrder.rejected, (state, action) => {
      state.orderCreateRequest = false;
      state.orderCreateError = action.error?.message || 'Неизвестная ошибка при создании заказа';
    })
    .addCase(createOrder.fulfilled, (state, action) => {
      state.orderCreateRequest = false;
      state.order = {
        id: action.payload.order.number,
        name: action.payload.name,
      };
    }),
});

export const { getOrderState } = slice.selectors;
export const { resetOrder } = slice.actions;
export default slice.reducer;
