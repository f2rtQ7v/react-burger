import { useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store.ts';
import { useLocation, Link } from 'react-router-dom';
import actions from '../../services/features/orders.all/actions.ts';
import Orders from '../../components/orders/orders.tsx'
import { LoadingScreen } from '../../components/screens/screens.tsx';
import { ordersAllUrl } from '../../utils/orders.ts';
import styles from './orders.all.module.css';

type TOrdersGroup = [
  orders: IOrder[],
  title: string,
  extraClass: string,
];

export default function OrdersPage() {
  const location = useLocation();
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

  const groupedOrders = orders.reduce((acc: [ TOrdersGroup, TOrdersGroup ], n) => (
    acc[+(n.status !== 'done')][0].push(n),
    acc
  ), [
    [ [],   'Готовы:', 'done' ],
    [ [], 'В работе:',     '' ],
  ]);

  const totals = [
    [ 'Выполнено за всё время:', total ],
    [ 'Выполнено за сегодня:', totalToday ],
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Лента заказов</h1>
      <div className={styles.content}>
        <div className={styles.ordersWrapper}>
          <Orders orders={orders} />
        </div>
        <div className={styles.statistics}>
          <div className={styles.orderIds}>
            {groupedOrders.map(([ ids, title, extraClass ]) => (
              <div>
                <div className={styles.title}>{title}</div>
                <div className={styles.orderIdsListWrapper}>
                  <ul
                    className={styles.orderIdsList}
                    style={{ columns: Math.ceil(ids.length / 5) }}
                  >
                    {ids.map(n => (
                      <li className={styles.orderIdsListItem}>
                        <Link
                          to={`${location.pathname}/${n.number}`}
                          state={{ background: location }}
                          className={styles.orderIdsListItemLink + ' ' + extraClass}
                        >
                          {n.number}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {totals.map(([ title, value ]) => (
            <div className={styles.total}>
              <div className={styles.title}>{title}</div>
              <div className={styles.totalValue}>{value.toLocaleString('ru')}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
