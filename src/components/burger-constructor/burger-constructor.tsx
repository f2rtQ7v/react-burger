import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import useDispatch from '../../hooks/use-app-dispatch.ts';
import { getIngredients, getTotal, addIngredient, resetConstructor } from '../../services/burger-constructor/slice.ts';
import { getOrderState, resetOrder } from '../../services/order/slice.ts';
import { checkAuth } from '../../services/auth/slice.ts';
import { createOrder } from '../../services/order/actions.ts';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsList from './ingredients-list/ingredients-list.tsx';
import IngredientItemBun from './ingredient-item/ingredient-item-bun.tsx';
import IngredientItemFilling from './ingredient-item/ingredient-item-filling.tsx';
import Modal from '../modal/modal.tsx';
import OrderDetails from '../order-details/order-details.tsx';
import { LoadingScreen, ErrorScreen } from '../screens/';
import styles from './burger-constructor.module.css';

export default function BurgerConstructor() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { bun, fillings } = useSelector(getIngredients);
  const total = useSelector(getTotal);
  const {
    order,
    request: orderCreateRequest,
    error: orderCreateError,
  } = useSelector(getOrderState);
  const isAuth = useSelector(checkAuth);

  const [ { canDrop }, dropRef ] = useDrop(() => ({
    accept: 'ingredient',
    drop(ingredient: IIngredient) {
      dispatch(addIngredient(ingredient));
    },
    collect: monitor => ({
      canDrop: monitor.canDrop(),
    }),
  }));

  const onCreateOrderClick = useCallback(() => {
    if (isAuth) {
      dispatch(createOrder([ bun!, ...fillings, bun! ].map(n => n._id)));
    } else {
      navigate('/login', {
        replace: true,
        state: {
          from: location.pathname,
        },
      });
    }
  }, [ dispatch, bun, fillings, isAuth, location, navigate ]);

  const onCloseOrderModalClick = useCallback(() => {
    dispatch(resetConstructor());
    dispatch(resetOrder());
  }, [ dispatch ]);

  return (
    <section className={`${styles.container} ${canDrop ? styles.drop : ''}`} ref={dropRef}>

      <IngredientsList>
        <IngredientItemBun ingredient={bun} type="top" />
      </IngredientsList>
      <IngredientsList>
        {!fillings.length && <IngredientItemFilling />}
        {fillings.map((n: IIngredient, i: number) => <IngredientItemFilling key={n.id} ingredient={n} index={i} />)}
      </IngredientsList>
      <IngredientsList>
        <IngredientItemBun ingredient={bun} type="bottom" />
      </IngredientsList>

      <div className={styles.footer}>
        <span className={styles.total}>
          {total}
          <CurrencyIcon type="primary" />
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

      {(order || orderCreateError) && (
        <Modal onClose={onCloseOrderModalClick}>
          {orderCreateError && (
            <ErrorScreen transparent>
              <span>Не удалось создать заказ</span>
              <span>{orderCreateError}</span>
            </ErrorScreen>
          )}
          {order && <OrderDetails orderId={order.id} />}
        </Modal>
      )}
      {orderCreateRequest && (
        <LoadingScreen>
          <span>Создание заказа</span>
          <span>Ждите</span>
        </LoadingScreen>
      )}

    </section>
  );
}
