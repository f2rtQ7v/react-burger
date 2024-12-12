import { useState, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsList from '../ingredients-list/ingredients-list.tsx';
import IngredientItem from '../ingredient-item/ingredient-item.tsx';
import { IngredientTypes, Ingredients } from '../../utils/types.js';
import styles from './burger-ingredients.module.css';

function BurgerIngredients({ ingredients, ingredientTypes, className }) {
  const [ activeTab, setActiveTab ] = useState(ingredients[0].type);

  const groupedIngredients = useMemo(() => {
    return ingredients.reduce((acc, n) => (
      (acc[n.type] ??= []).push(n),
      acc
    ), {});
  }, [ ingredients ]);

  const refs = useRef({});

  function onTabClick(value) {
    setActiveTab(value);
    refs.current[value].scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  return (
    <section className={`${styles.container} ${className ? className : ''}`}>
      <div className={styles.header}>
        {ingredientTypes.map(({ name, value }) => (
          <Tab
            key={value}
            value={value}
            active={activeTab === value}
            onClick={onTabClick}
          >
            {name}
          </Tab>
        ))}
      </div>
      <div className={styles.ingredients}>
        {ingredientTypes.map(({ name, value }) => (
          <IngredientsList key={value} title={name} ref={el => refs.current[value] = el}>
            {groupedIngredients[value].map(n => (
              <IngredientItem key={n._id} {...n} />
            ))}
          </IngredientsList>
        ))}
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  className: PropTypes.string,
  ingredientTypes: IngredientTypes.isRequired,
  ingredients: Ingredients.isRequired,
};

export default BurgerIngredients;
