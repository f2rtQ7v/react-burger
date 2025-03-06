import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../components/modal/modal.tsx';
import OrderDetails from '../components/order-details/order-details.tsx';

export default function OrderPage({ showStatus = false }: { showStatus?: boolean }) {
  const navigate = useNavigate();
  const { number } = useParams();

  return (
    <Modal
      title={`#${number}`}
      onClose={() => navigate(-1)}
    >
      <OrderDetails showStatus={showStatus} />
    </Modal>
  );
}
