import { Link, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../../utils/types.js';
import styles from './ingredient-item.module.css';

function IngredientItem({ ingredient, count, ...props }) {
  const location = useLocation();

  const [ , dragRef ] = useDrag(() => ({
    type: 'ingredient',
    item: ingredient,
  }));

  return (
    <Link
      to={`/ingredient/${ingredient._id}`}
      state={{ background: location }}
      ref={dragRef}
    >
      <div className={styles.ingredient} {...props}>
        <div className={styles.image}>
          {count ? <Counter count={count} /> : null}
          <img src={ingredient.image} />
        </div>
        <span className={styles.price}>
          {ingredient.price}
          <CurrencyIcon type="primary" />
        </span>
        <span className={styles.name}>{ingredient.name}</span>
      </div>
    </Link>
  );
}

IngredientItem.propTypes = {
  ingredient: Ingredient.isRequired,
  count: PropTypes.number.isRequired,
};

export default IngredientItem;
