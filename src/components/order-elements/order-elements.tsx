import { ReactNode } from 'react';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '@components/price/price.tsx';
import styles from './order-elements.module.css';

const statuses: {
  [key in TOrderStatus]: [ string, string ];
} = {
  created: [    'Создан',     '' ],
  pending: [ 'Готовится',     '' ],
  done:    [  'Выполнен', 'done' ],
};

export function OrderStatus({ status }: { status: TOrderStatus }) {
  const [ text, extraClass ] = statuses[status];
  return <div className={`${styles.status} ${extraClass}`}>{text}</div>;
}

export function OrderDate({ date }: { date: string }) {
  return <FormattedDate date={new Date(date)} className={styles.date} />;
}

export function OrderNumber({ number }: { number: number }) {
  return <div className={styles.number}>#{number}</div>;
}

export function OrderName({ name, className = '' }: { name: string, className: string }) {
  return <div className={`${styles.name} ${className}`}>{name}</div>;
}

export function OrderHeader({ number, children }: { number: number, children?: ReactNode }) {
  return (
    <div className={styles[children ? 'header' : 'headerCentered']}>
      <OrderNumber number={number} />
      {children}
    </div>
  );
}

export function OrderFooter({ price, children }: { price: number, children?: ReactNode }) {
  return (
    <div className={styles.footer}>
      {children}
      <Price value={price} />
    </div>
  );
}
