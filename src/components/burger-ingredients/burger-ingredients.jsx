import { useState, useMemo, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BURGER_INGREDIENTS_SET_ACTIVE } from '../../services/actions/burger-ingredients.js';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsList from './ingredients-list/ingredients-list.jsx';
import IngredientItem from './ingredient-item/ingredient-item.jsx';
import IngredientDetails from './ingredient-details/ingredient-details.jsx';
import Modal from '../modal/modal.jsx';
import styles from './burger-ingredients.module.css';
import { INGREDIENT_TYPES } from '../../utils/data.js';

function BurgerIngredients() {
  const dispatch = useDispatch();

  const { ingredients, activeIngredient } = useSelector(state => state.burgerIngredients);
  const { bun, fillings } = useSelector(state => state.burgerConstructor);

  const [ activeTab, setActiveTab ] = useState(INGREDIENT_TYPES[0].value);
  const tabRefs = useRef({});

  const setActiveIngredient = useCallback(ingredient => {
    dispatch({ type: BURGER_INGREDIENTS_SET_ACTIVE, ingredient });
  }, [ dispatch ]);

  const countSelectedIngredients = useMemo(() => {
    return fillings.reduce((acc, n) => (
      acc[n._id] = -~acc[n._id],
      acc
    ), bun ? { [bun._id]: 2 } : {});
  }, [ bun, fillings ]);

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
                onClick={() => setActiveIngredient(n)}
              />
            ))}
          </IngredientsList>
        ))}
      </div>
      {activeIngredient &&
        <Modal
          title="Детали ингредиента"
          onClose={() => setActiveIngredient(null)}
        >
          <IngredientDetails ingredient={activeIngredient} />
        </Modal>
      }
    </section>
  );
}

export default BurgerIngredients;
