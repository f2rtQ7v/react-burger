import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import { useSelector, useDispatch } from '../../services/store.ts';
import { getIngredients, getTotal, addIngredient, resetConstructor } from '../../services/features/burger-constructor/slice.ts';
import { getOrderState, resetOrder } from '../../services/features/order/slice.ts';
import { checkAuth } from '../../services/features/auth/slice.ts';
import { createOrder } from '../../services/features/order/actions.ts';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../../components/price/price.tsx';
import IngredientsList from './ingredients-list/ingredients-list.tsx';
import IngredientItemBun from './ingredient-item/ingredient-item-bun.tsx';
import IngredientItemFilling from './ingredient-item/ingredient-item-filling.tsx';
import Modal from '../modal/modal.tsx';
import OrderDetails from '../order-details/order-details.tsx';
import { LoadingScreen, ErrorScreen } from '../screens/screens.tsx';
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
        {fillings.map((n, i) => <IngredientItemFilling key={n.id} ingredient={n} index={i} />)}
      </IngredientsList>
      <IngredientsList>
        <IngredientItemBun ingredient={bun} type="bottom" />
      </IngredientsList>

      <div className={styles.footer}>
        <Price value={total} size="medium" />
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
            <ErrorScreen>
              <span>Не удалось создать заказ</span>
              <span>{orderCreateError}</span>
            </ErrorScreen>
          )}
          {order && <OrderDetails orderNumber={order.number} />}
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
