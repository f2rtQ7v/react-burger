import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../services/store.ts';
import { actions } from '../services/features/auth/actions.ts';
import { getAuthState, resetError } from '../services/features/auth/slice.ts';
import Modal from '../components/modal/modal.tsx';
import { LoadingScreen, ErrorScreen } from '../components/screens/screens.tsx';

export default function LogoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { logout: { request, error } } = useSelector(getAuthState);
  const onCloseModal = () => {
    dispatch(resetError('logout'));
    navigate(location.state?.from?.pathname ?? '/profile');
  };

  useEffect(() => {
    dispatch(actions.logout());
  }, [ dispatch ]);

  return (<>
    {request && <LoadingScreen />}
    {error && (
      <Modal onClose={onCloseModal}>
        <ErrorScreen>
          <span>Ошибка при выходе</span>
          <span>{error}</span>
        </ErrorScreen>
      </Modal>
    )}
  </>);
}
