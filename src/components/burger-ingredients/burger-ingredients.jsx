import { useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getIngredientsGroupedByType } from '../../services/burger-ingredients/slice.js';
import { getCount } from '../../services/burger-constructor/slice.js';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsList from './ingredients-list/ingredients-list.jsx';
import IngredientItem from './ingredient-item/ingredient-item.jsx';
import styles from './burger-ingredients.module.css';
import throttle from '../../utils/throttle.js';
import { INGREDIENT_TYPES } from '../../utils/data.js';

function BurgerIngredients() {
  const ingredients = useSelector(getIngredientsGroupedByType);
  const countSelectedIngredients = useSelector(getCount);

  const [ activeTab, setActiveTab ] = useState(0);
  const tabRefs = useRef([]);

  const onTabClick = useCallback(index => {
    tabRefs.current[index].scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, []);

  const onScroll = useCallback(
    throttle(({ target: t }) => {
      const { top } = t.getBoundingClientRect();
      const [ index ] = tabRefs.current.reduce((min, n, i) => {
        const diff = Math.abs(n.getBoundingClientRect().top - top);
        return diff < min[1] ? [ i, diff ] : min;
      }, [ -1, Infinity ]);

      setActiveTab(index);
    }, 100)
  , []);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        {INGREDIENT_TYPES.map(({ name, value }, i) => (
          <Tab
            key={value}
            value={i}
            active={activeTab === i}
            onClick={onTabClick}
          >
            {name}
          </Tab>
        ))}
      </div>
      <div className={styles.ingredients} onScroll={onScroll}>
        {INGREDIENT_TYPES.map(({ name, value }, i) => (
          <IngredientsList
            key={value}
            title={name}
            ref={el => tabRefs.current[i] = el}
          >
            {ingredients[value].map(n => (
              <IngredientItem
                key={n._id}
                ingredient={n}
                count={countSelectedIngredients[n._id] ?? 0}
              />
            ))}
          </IngredientsList>
        ))}
      </div>
    </section>
  );
}

export default BurgerIngredients;
