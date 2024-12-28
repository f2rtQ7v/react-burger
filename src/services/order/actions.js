import { createAsyncThunk } from '@reduxjs/toolkit';
import { createOrderRequest } from '../../utils/api.js';

export const createOrder = createAsyncThunk(
  'order/create',
  ingredients => {
    return createOrderRequest(ingredients);
  }
);
