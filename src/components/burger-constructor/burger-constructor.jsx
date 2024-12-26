import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { BURGER_CONSTRUCTOR_ADD } from '../../services/actions/burger-constructor.js';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsList from './ingredients-list/ingredients-list.jsx';
import IngredientItemBun from './ingredient-item/ingredient-item-bun.jsx';
import IngredientItemFilling from './ingredient-item/ingredient-item-filling.jsx';
import Modal from '../modal/modal.jsx';
import OrderDetails from '../order-details/order-details.jsx';
import styles from './burger-constructor.module.css';

function BurgerConstructor() {
  const dispatch = useDispatch();

  const { bun, fillings } = useSelector(state => state.burgerConstructor);

  const [ showOrder, setShowOrder ] = useState(false);

  const total = useMemo(() => {
    return fillings.reduce((acc, n) => acc + n.price, bun?.price << 1);
  }, [ bun, fillings ]);

  const [ collected, dropRef ] = useDrop(() => ({
    accept: 'ingredient',
    drop(ingredient) {
      dispatch({ type: BURGER_CONSTRUCTOR_ADD, ingredient });
    },
  }));

  return (
    <section className={styles.container} ref={dropRef}>

      <IngredientsList>
        <IngredientItemBun ingredient={bun} type="top" />
      </IngredientsList>
      <IngredientsList>
        {!fillings.length && <IngredientItemFilling />}
        {fillings.map((n, i) => <IngredientItemFilling key={n.id} ingredient={n} index={i} />)}
      </IngredientsList>
      <IngredientsList>
        <IngredientItemBun ingredient={bun} type="bottom" />
      </IngredientsList>

      <div className={styles.footer}>
        <span className={styles.total}>
          {total}
          <CurrencyIcon />
        </span>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          disabled={!bun}
          onClick={() => setShowOrder(true)}
        >
          Оформить заказ
        </Button>
      </div>

      {showOrder &&
        <Modal onClose={() => setShowOrder(false)}>
          <OrderDetails orderId={Math.random() * 1e6 | 0} />
        </Modal>
      }

    </section>
  );
}

export default BurgerConstructor;
