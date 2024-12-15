import { useState, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsList from './burger-ingredients-list/burger-ingredients-list.tsx';
import BurgerIngredientItem from './burger-ingredient-item/burger-ingredient-item.tsx';
import { IngredientTypes, Ingredients } from '../../utils/types.js';
import styles from './burger-ingredients.module.css';

function BurgerIngredients({ ingredients, ingredientTypes, selectedIngredients, addIngredient, className }) {
  const [ activeTab, setActiveTab ] = useState(ingredients[0].type);
  const tabRefs = useRef({});

  const countSelectedIngredients = useMemo(() => {
    return selectedIngredients.reduce((acc, n) => (
      acc[n._id] = -~acc[n._id],
      acc
    ), {});
  }, [ selectedIngredients ]);

  const groupedIngredients = useMemo(() => {
    return ingredients.reduce((acc, n) => (
      (acc[n.type] ??= []).push({
        ...n,
        count: countSelectedIngredients[n._id] ?? 0,
      }),
      acc
    ), {});
  }, [ ingredients, countSelectedIngredients ]);

  function onTabClick(value) {
    setActiveTab(value);
    tabRefs.current[value].scrollIntoView({
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
          <BurgerIngredientsList key={value} title={name} ref={el => tabRefs.current[value] = el}>
            {groupedIngredients[value].map(n => (
              <BurgerIngredientItem key={n._id} ingredient={n} onDoubleClick={() => addIngredient(n)} />
            ))}
          </BurgerIngredientsList>
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
