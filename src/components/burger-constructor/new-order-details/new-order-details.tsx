import styles from './new-order-details.module.css';
import checkMarkImage from '@/images/check-mark.png';

export default function NewOrderDetails({ orderNumber }: { orderNumber: number }) {
  return (
    <div className={styles.container}>
      <div className="text text_type_digits-large">{orderNumber}</div>
      <div className="m-5 text text_type_main-medium">идентификатор заказа</div>
      <div className="m-10">
        <img src={checkMarkImage} />
      </div>
      <div className="m-2 text text_type_main-default">Заказ начали готовить</div>
      <div className="m-2 text text_type_main-default text_color_inactive">Дождитесь готовности</div>
    </div>
  );
}
