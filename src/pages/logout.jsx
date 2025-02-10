import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../services/auth/actions.js';
import { resetError } from '../services/auth/slice.js';
import Modal from '../components/modal/modal.jsx';
import { LoadingScreen, ErrorScreen } from '../components/screens/';

export default function LogoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { request, error } = useSelector(state => state.auth.logout);
  const onCloseModal = () => {
    dispatch(resetError('logout'));
    navigate(location.state?.from ? -1 : '/profile');
  };

  useEffect(() => {
    dispatch(logout());
  }, [ dispatch ]);

  return (<>
    {request && <LoadingScreen />}
    {error && (
      <Modal onClose={onCloseModal}>
        <ErrorScreen transparent>
          <span>Ошибка при выходе</span>
          <span>{error}</span>
        </ErrorScreen>
      </Modal>
    )}
    </>
  );
}
