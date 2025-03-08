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
                to={`${location.pathname}/${n}`}
                state={{ background: location }}
                className={styles.orderIdsListItemLink + ' ' + extraClass}
              >
                {n}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
