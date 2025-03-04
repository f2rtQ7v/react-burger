import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsRequest } from '../../../utils/api.ts';

export const getIngredients = createAsyncThunk(
  'burgerIngredients/get',
  () => {
    return getIngredientsRequest();
  }
);
