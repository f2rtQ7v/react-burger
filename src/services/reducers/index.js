import { combineReducers } from 'redux';
import burgerIngredients from './burger-ingredients.js';
import burgerConstructor from './burger-constructor.js';
import order from './order.js';

export default combineReducers({
  burgerIngredients,
  burgerConstructor,
  order,
});
