import { useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { BURGER_CONSTRUCTOR_ADD, BURGER_CONSTRUCTOR_RESET } from '../../services/actions/burger-constructor.js';
import { ORDER_RESET } from '../../services/actions/order.js';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsList from './ingredients-list/ingredients-list.jsx';
import IngredientItemBun from './ingredient-item/ingredient-item-bun.jsx';
import IngredientItemFilling from './ingredient-item/ingredient-item-filling.jsx';
import Modal from '../modal/modal.jsx';
import OrderDetails from '../order-details/order-details.jsx';
import { createOrder } from '../../services/actions/order.js';
import styles from './burger-constructor.module.css';

function BurgerConstructor() {
  const dispatch = useDispatch();

  const { bun, fillings } = useSelector(state => state.burgerConstructor);
  const { order } = useSelector(state => state.order);

  const [ showOrder, setShowOrder ] = useState(false);

  const total = useMemo(() => {
    return fillings.reduce((acc, n) => acc + n.price, bun?.price << 1);
  }, [ bun, fillings ]);

  const [ { canDrop }, dropRef ] = useDrop(() => ({
    accept: 'ingredient',
    drop(ingredient) {
      dispatch({ type: BURGER_CONSTRUCTOR_ADD, ingredient });
    },
    collect: monitor => ({
      canDrop: monitor.canDrop(),
    }),
  }));

  const onCreateOrderClick = useCallback(() => {
    dispatch(createOrder(bun, fillings));
  }, [ bun, fillings ]);

  const onCloseOrderModalClick = useCallback(() => {
    dispatch({ type: BURGER_CONSTRUCTOR_RESET });
    dispatch({ type: ORDER_RESET });
  }, []);

  return (
    <section className={`${styles.container} ${canDrop ? styles.drop : ''}`} ref={dropRef}>

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
          onClick={onCreateOrderClick}
        >
          Оформить заказ
        </Button>
      </div>

      {order &&
        <Modal onClose={onCloseOrderModalClick}>
          <OrderDetails orderId={order.id} />
        </Modal>
      }

    </section>
  );
}

export default BurgerConstructor;
