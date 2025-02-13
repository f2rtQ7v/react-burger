import { createSlice } from '@reduxjs/toolkit';
import { createOrder } from './actions.ts';

interface IOrderState extends IRequestState {
  order: IOrder | null;
}

const initialState: IOrderState = {
  order: null,
  request: false,
  error: null,
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
      state.request = true;
      state.error = null;
    })
    .addCase(createOrder.rejected, (state, action) => {
      state.request = false;
      state.error = action.error?.message || 'Неизвестная ошибка при создании заказа';
    })
    .addCase(createOrder.fulfilled, (state, action) => {
      state.request = false;
      state.order = {
        id: action.payload.order.number,
        name: action.payload.name,
      };
    }),
});

export const { getOrderState } = slice.selectors;
export const { resetOrder } = slice.actions;
export default slice.reducer;
