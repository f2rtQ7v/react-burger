import { useNavigate } from 'react-router-dom';
import Modal from '../components/modal/modal.tsx';
import IngredientDetails from '../components/ingredient-details/ingredient-details.tsx';

export default function IngredientPage() {
  const navigate = useNavigate();

  return (
    <Modal
      title="Детали ингредиента"
      onClose={() => navigate(-1)}
    >
      <IngredientDetails />
    </Modal>
  );
}
