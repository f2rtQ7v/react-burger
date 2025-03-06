import styles from './order-status.module.css';

const statuses: {
  [key in TOrderStatus]: [ string, string ];
} = {
  created: [    'Создан',     '' ],
  pending: [ 'Готовится',     '' ],
  done:    [  'Выполнен', 'done' ],
};

export default function OrderStatus({ status }: { status: TOrderStatus }) {
  const [ text, extraClass ] = statuses[status];

  return (
    <div className={styles.status + ' ' + extraClass}>{text}</div>
  );
}
