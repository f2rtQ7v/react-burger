import { useNavigate, useParams } from 'react-router-dom';
import Modal from '@components/modal/modal.tsx';
import OrderDetails from '@components/order-details/order-details.tsx';
import { OrderNumber } from '@components/order-elements/order-elements.tsx';

export default function OrderPage() {
  const navigate = useNavigate();
  const { number = -1 } = useParams();

  return (
    <Modal
      title={<OrderNumber number={+number} />}
      onClose={() => navigate(-1)}
    >
      <OrderDetails />
    </Modal>
  );
}
