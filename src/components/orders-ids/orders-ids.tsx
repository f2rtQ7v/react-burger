import { useLocation, Link } from 'react-router-dom';
import styles from './orders-ids.module.css';

interface IOrdersIdsProps {
  title: string;
  ids: number[];
  extraClass?: string;
}

export default function OrdersIds({ title, ids, extraClass = '' }: IOrdersIdsProps) {
  const location = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.orderIdsList}>
        {ids.map(n => (
          <Link
            key={n}
            to={`${location.pathname}/${n}`}
            state={{ background: location }}
            className={`${styles.orderIdsListItem} ${extraClass}`}
          >
            {n}
          </Link>
        ))}
      </div>
    </div>
  );
}
