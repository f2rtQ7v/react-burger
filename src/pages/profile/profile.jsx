import { useLocation, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../services/auth/actions.js';
import { resetError } from '../../services/auth/slice.js';
import Link from '../../components/link/link.jsx';
import Modal from '../../components/modal/modal.jsx';
import { LoadingScreen, ErrorScreen } from '../../components/screens/';
import styles from './profile.module.css';

export default function ProfilePage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { request, error } = useSelector(state => state.auth.logout);
  const onCloseModal = () => dispatch(resetError('logout'));

  const links = [
    {
      to: '/profile',
      text: 'Профиль',
      description: 'В этом разделе вы можете изменить свои персональные данные',
    },
    {
      to: '/profile/orders',
      text: 'История заказов',
      description: 'В этом разделе вы можете посмотреть свою историю заказов',
    },
    {
      to: '',
      text: 'Выход',
      onClick: e => {
        e.preventDefault();
        dispatch(logout());
      },
    },
  ];

  const { description } = links.find(n => n.to === location.pathname) ?? {};

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <nav className={styles.nav}>
          {links.map(({ text, ...n }) => (
            <Link key={n.to} className={styles.link} {...n}>{text}</Link>
          ))}
        </nav>
        <div className={styles.description}>{description}</div>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
      {request && <LoadingScreen />}
      {error && (
        <Modal onClose={onCloseModal}>
          <ErrorScreen transparent>
            <span>Ошибка при выходе</span>
            <span>{error}</span>
          </ErrorScreen>
        </Modal>
      )}
    </div>
  );
}
