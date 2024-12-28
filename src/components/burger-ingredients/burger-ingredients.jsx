import { useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredientsGroupedByType } from '../../services/burger-ingredients/slice.js';
import { getCount } from '../../services/burger-constructor/slice.js';
import { getActiveIngredient, setActiveIngredient } from '../../services/ingredient-details/slice.js';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsList from './ingredients-list/ingredients-list.jsx';
import IngredientItem from './ingredient-item/ingredient-item.jsx';
import IngredientDetails from './ingredient-details/ingredient-details.jsx';
import Modal from '../modal/modal.jsx';
import styles from './burger-ingredients.module.css';
import { INGREDIENT_TYPES } from '../../utils/data.js';

function BurgerIngredients() {
  const dispatch = useDispatch();

  const ingredients = useSelector(getIngredientsGroupedByType);
  const activeIngredient = useSelector(getActiveIngredient);
  const countSelectedIngredients = useSelector(getCount);

  const [ activeTab, setActiveTab ] = useState(INGREDIENT_TYPES[0].value);
  const tabRefs = useRef({});

  const onTabClick = useCallback(value => {
    setActiveTab(value);
    tabRefs.current[value].scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        {INGREDIENT_TYPES.map(({ name, value }) => (
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
        {INGREDIENT_TYPES.map(({ name, value }) => (
          <IngredientsList
            key={value}
            title={name}
            ref={el => tabRefs.current[value] = el}
          >
            {ingredients[value].map(n => (
              <IngredientItem
                key={n._id}
                ingredient={n}
                count={countSelectedIngredients[n._id] ?? 0}
                onClick={() => dispatch(setActiveIngredient(n))}
              />
            ))}
          </IngredientsList>
        ))}
      </div>
      {activeIngredient &&
        <Modal
          title="Детали ингредиента"
          onClose={() => dispatch(setActiveIngredient(null))}
        >
          <IngredientDetails ingredient={activeIngredient} />
        </Modal>
      }
    </section>
  );
}

export default BurgerIngredients;
