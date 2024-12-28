import { createSlice } from '@reduxjs/toolkit';
import { createOrder } from './actions.js';

const initialState = {
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
    getOrder: state => state.order,
  },
  extraReducers: builder => builder
    .addCase(createOrder.pending, (state) => {
      state.orderCreateRequest = true;
    })
    .addCase(createOrder.rejected, (state, action) => {
      state.orderCreateRequest = false;
      state.orderCreateError = action.error;
    })
    .addCase(createOrder.fulfilled, (state, action) => {
      state.orderCreateRequest = false;
      state.order = {
        id: action.payload.order.number,
        name: action.payload.name,
      };
    }),
});

export const { getOrder } = slice.selectors;
export const { resetOrder } = slice.actions;
export default slice.reducer;
