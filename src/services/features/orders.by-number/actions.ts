import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderRequest } from '@utils/api.ts';

export const getOrder = createAsyncThunk(
  'order/get',
  (orderNumber: number) => {
    return getOrderRequest(orderNumber);
  }
);
