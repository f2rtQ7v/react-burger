import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useDispatch from '../../hooks/use-app-dispatch.ts';
import actions from '../../services/features/orders.all/actions.ts';
import Orders from '../../components/orders/orders.tsx'
import { LoadingScreen } from '../../components/screens/screens.tsx';
import { ordersAllUrl } from '../../utils/orders.ts';
import styles from './orders.all.module.css';

export default function OrdersPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.connect(ordersAllUrl()));
    return () => dispatch(actions.disconnect());
  }, [ dispatch ]);

  const { orders } = useSelector(state => state.ordersAll);

  if (!orders) {
    return <LoadingScreen />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Лента заказов</h1>
      <div className={styles.content}>
        <Orders orders={orders} />
      </div>
    </div>
  );
}
