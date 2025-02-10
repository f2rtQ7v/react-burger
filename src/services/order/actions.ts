import { createAsyncThunk } from '@reduxjs/toolkit';
import { createOrderRequest } from '../../utils/api.ts';

export const createOrder = createAsyncThunk(
  'order/create',
  ingredients => {
    return createOrderRequest(ingredients);
  }
);
