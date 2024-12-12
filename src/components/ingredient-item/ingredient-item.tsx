import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../utils/types.js';
import styles from './ingredient-item.module.css';


const IngredientItem = ({ name, price, count, image }) => (
  <div className={styles.ingredient}>
    <div className={styles.image}>
      {count ? <Counter count={count} /> : null}
      <img src={image} />
    </div>
    <span className={styles.price}>
      {price}
      <CurrencyIcon type="primary" />
    </span>
    <span className={styles.name}>{name}</span>
  </div>
);

IngredientItem.propTypes = Ingredient;

export default IngredientItem;
