import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsRequest } from '../../utils/api.js';

export const getIngredients = createAsyncThunk(
  'burgerIngredients/get',
  () => {
    return getIngredientsRequest();
  }
);
