import {
  BURGER_INGREDIENTS_REQUEST,
  BURGER_INGREDIENTS_SUCCESS,
  BURGER_INGREDIENTS_ERROR,
  BURGER_INGREDIENTS_SET_ACTIVE,
} from '../actions/burger-ingredients.js';

const initialState = {
  ingredients: null,
  ingredientsRequest: false,
  ingredientsError: null,
  activeIngredient: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BURGER_INGREDIENTS_REQUEST:
      return {
        ...state,
        ingredientsRequest: true,
      };

    case BURGER_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.data.reduce((acc, n) => (
          (acc[n.type] ??= []).push(n),
          acc
        ), {}),
        ingredientsRequest: false,
      };

    case BURGER_INGREDIENTS_ERROR:
      return {
        ...state,
        ingredientsError: action.error || 'Неизвестная ошибка при загрузке списка ингредиентов',
        ingredientsRequest: false,
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
