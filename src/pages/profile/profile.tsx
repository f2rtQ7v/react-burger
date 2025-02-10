import { useLocation, Outlet } from 'react-router-dom';
import Link from '../../components/link/link.tsx';
import styles from './profile.module.css';

export default function ProfilePage() {
  const location = useLocation();

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
      to: '/profile/logout',
      text: 'Выход',
      state: { from: location },
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
    </div>
  );
}
