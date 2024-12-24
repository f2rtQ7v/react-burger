import { getIngredients } from '../../utils/api.js';

const base = 'burger_ingredients/';

export const BURGER_INGREDIENTS_LOAD = `${base}load`;
export const BURGER_INGREDIENTS_SUCCESS = `${base}success`;
export const BURGER_INGREDIENTS_ERROR = `${base}error`;
export const BURGER_INGREDIENTS_SET_ACTIVE = `${base}set-active`;

export const loadIngredients = () => dispatch => {
  dispatch({ type: BURGER_INGREDIENTS_LOAD });

  getIngredients()
    .then(r => dispatch({ type: BURGER_INGREDIENTS_SUCCESS, data: r.data }))
    .catch(e => dispatch({ type: BURGER_INGREDIENTS_ERROR, error: e }));
};
