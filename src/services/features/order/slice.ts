import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import createRequestState from '../../../utils/create-request-state.ts';
import { createOrderRequest } from '../../../utils/api.ts';

interface IOrderState extends IRequestState {
  order: INewOrder | null;
}

export const createOrder = createAsyncThunk('order/create', createOrderRequest);

export const initialState = createRequestState<IOrderState>({ order: null });

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
        number: action.payload.order.number,
        name: action.payload.name,
      };
    }),
});

export const { getOrderState } = slice.selectors;
export const { resetOrder } = slice.actions;
export default slice.reducer;
