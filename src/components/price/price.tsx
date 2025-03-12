import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './price.module.css';

interface IPriceProps {
  value: number | string;
  size?: 'default' | 'medium' | 'large';
  className?: string;
}

export default function Price({
  value,
  size = 'default',
  className = '',
}: IPriceProps) {
  return (
    <div className={`${styles.price} text_type_digits-${size} ${className}`}>
      <span>{value}</span>
      <CurrencyIcon type="primary" />
    </div>
  );
}
