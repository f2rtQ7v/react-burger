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

  const { orders, total, totalToday } = useSelector(state => state.ordersAll);

  if (!orders) {
    return <LoadingScreen />;
  }

  const groupedOrders = orders.reduce((acc, n) => (
    acc[+(n.status !== 'done')][0].push(n),
    acc
  ), [
    [ [],   'Готовы:', styles.done ],
    [ [], 'В работе:',          '' ],
  ]);

  const totals = [
    [ 'Выполнено за всё время:', total ],
    [ 'Выполнено за сегодня:', totalToday ],
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Лента заказов</h1>
      <div className={styles.content}>
        <Orders orders={orders} />
        <div className={styles.statistics}>
          <div className={styles.orderIds}>
            {groupedOrders.map(([ ids, title, extraClass ]) => (
              <div>
                <div className={styles.title}>{title}</div>
                <div className={styles.orderIdsListWrapper}>
                  <ul
                    className={styles.orderIdsList + ' ' + extraClass}
                    style={{ columns: Math.ceil(ids.length / 5) }}
                  >
                    {ids.map(n => <li className={styles.orderIdsListItem}>{n.number}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {totals.map(([ title, value ]) => (
            <div className={styles.total}>
              <div className={styles.title}>{title}</div>
              <div className={styles.totalValue}>{value.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
