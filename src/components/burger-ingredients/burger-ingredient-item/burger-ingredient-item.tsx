import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../../utils/types.js';
import styles from './burger-ingredient-item.module.css';

const IngredientItem = ({ ingredient, onDoubleClick }) => (
  <div className={styles.ingredient} onDoubleClick={onDoubleClick}>
    <div className={styles.image}>
      {ingredient.count ? <Counter count={ingredient.count} /> : null}
      <img src={ingredient.image} />
    </div>
    <span className={styles.price}>
      {ingredient.price}
      <CurrencyIcon type="primary" />
    </span>
    <span className={styles.name}>{ingredient.name}</span>
  </div>
);

IngredientItem.propTypes = {
  ingredient: Ingredient.isRequired,
  onDoubleClick: PropTypes.func,
};

export default IngredientItem;
