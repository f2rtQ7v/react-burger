import { useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store.ts';
import actions from '../../services/features/orders.all/actions.ts';
import OrdersList from '../../components/orders-list/orders-list.tsx';
import OrdersIds from '../../components/orders-ids/orders-ids.tsx';
import OrdersTotal from '../../components/orders-total/orders-total.tsx';
import { LoadingScreen } from '../../components/screens/screens.tsx';
import { ordersAllUrl } from '../../utils/orders.ts';
import styles from './orders.all.module.css';

export default function OrdersPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.connect(ordersAllUrl()));
    return () => {
      dispatch(actions.disconnect());
    };
  }, [ dispatch ]);

  const { orders, total, totalToday } = useSelector(state => state.ordersAll);

  if (!orders) {
    return <LoadingScreen />;
  }

  const ordersIds = orders.reduce((acc: [ number[], number[] ], n) => (
    acc[+(n.status !== 'done')].push(n.number),
    acc
  ), [ [], [] ]);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Лента заказов</h1>
      <div className={styles.content}>
        <OrdersList orders={orders} />
        <div className={styles.statistics}>
          <div className={styles.orderIds}>
            <OrdersIds title="Готовы:" ids={ordersIds[0]} extraClass="done" />
            <OrdersIds title="В работе:" ids={ordersIds[1]} />
          </div>
          <OrdersTotal title="Выполнено за всё время:" value={total} />
          <OrdersTotal title="Выполнено за сегодня:" value={totalToday} />
        </div>
      </div>
    </div>
  );
}
