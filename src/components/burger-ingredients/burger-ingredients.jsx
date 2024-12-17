import { useState, useMemo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsList from './burger-ingredients-list/burger-ingredients-list.jsx';
import BurgerIngredientItem from './burger-ingredient-item/burger-ingredient-item.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import Modal from '../modal/modal.jsx';
import { Ingredients } from '../../utils/types.js';
import styles from './burger-ingredients.module.css';
import { INGREDIENT_TYPES } from '../../utils/data.js';

function BurgerIngredients({ ingredients, selectedIngredients, addIngredient }) {
  const [ activeTab, setActiveTab ] = useState(ingredients[0].type);
  const tabRefs = useRef({});

  const [ activeIngredient, setActiveIngredient ] = useState(null);

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
  }, [ countSelectedIngredients ]);

  function onTabClick(value) {
    setActiveTab(value);
    tabRefs.current[value].scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

/*==================================================================*/
  useEffect(() => {
    [
      [ 'bun', [ 1 ] ],
      [ 'main', [ 0, 1, 0, 2, 0 ] ],
      [ 'sauce', [ 3, 3, 3, 3, 3 ] ],
    ].forEach(([ k, v ]) => {
      v.forEach(i => addIngredient(groupedIngredients[k][i]));
    });
  }, []);
/*==================================================================*/

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
          <BurgerIngredientsList
            key={value}
            title={name}
            ref={el => tabRefs.current[value] = el}
          >
            {groupedIngredients[value].map(n => (
              <BurgerIngredientItem
                key={n._id}
                ingredient={n}
                onClick={() => setActiveIngredient(n)}
                /*onDoubleClick={() => addIngredient(n)}*/
              />
            ))}
          </BurgerIngredientsList>
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

BurgerIngredients.propTypes = {
  ingredients: Ingredients.isRequired,
  selectedIngredients: Ingredients.isRequired,
  addIngredient: PropTypes.func.isRequired,
};

export default BurgerIngredients;
