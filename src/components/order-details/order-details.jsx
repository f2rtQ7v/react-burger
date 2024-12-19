import PropTypes from 'prop-types';
import styles from './order-details.module.css';
import checkMarkImage from '../../images/check-mark.png';

const OrderDetails = ({ orderId, ...props }) => (
  <div className={styles.container} {...props}>
    <div className="text text_type_digits-large">{orderId}</div>
    <div className="m-5 text text_type_main-medium">идентификатор заказа</div>
    <div className="m-10">
      <img src={checkMarkImage} />
    </div>
    <div className="m-2 text text_type_main-default">Заказ начали готовить</div>
    <div className="m-2 text text_type_main-default text_color_inactive">Дождитесь готовности</div>
  </div>
);

OrderDetails.propTypes = {
  orderId: PropTypes.number.isRequired,
};

export default OrderDetails;
