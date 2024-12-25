import {
  BURGER_INGREDIENTS_LOAD,
  BURGER_INGREDIENTS_SUCCESS,
  BURGER_INGREDIENTS_ERROR,
  BURGER_INGREDIENTS_SET_ACTIVE,
} from '../actions/burger-ingredients.js';

const initialState = {
  ingredients: null,
  ingredientsLoad: false,
  ingredientsError: null,
  activeIngredient: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BURGER_INGREDIENTS_LOAD:
      return {
        ...state,
        ingredientsLoad: true,
      };

    case BURGER_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.data.reduce((acc, n) => (
          (acc[n.type] ??= []).push(n),
          acc
        ), {}),
        ingredientsLoad: false,
      };

    case BURGER_INGREDIENTS_ERROR:
      return {
        ...state,
        ingredientsError: action.error || 'Неизвестная ошибка',
        ingredientsLoad: false,
      };

    case BURGER_INGREDIENTS_SET_ACTIVE:
      return {
        ...state,
        activeIngredient: action.ingredient,
      };

    default:
      return state;
  }
};
