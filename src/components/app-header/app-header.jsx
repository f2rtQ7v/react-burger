import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Link from '../link/link.jsx';
import styles from './app-header.module.css';

const links = [
  { Icon:  BurgerIcon, to:        '/', text:    'Конструктор', id: 'burgerConstructor' },
  { Icon:    ListIcon, to:    '/feed', text:  'Лента заказов', id:              'feed' },
  { Icon: ProfileIcon, to: '/profile', text: 'Личный кабинет', id:           'profile', nested: true },
];

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {links.map(({ text, id, ...props }) => (
          <Link key={id} className={styles[id]} {...props}>
            {text}
          </Link>
        ))}
        <div className={styles.logo}>
          <Logo />
        </div>
      </nav>
    </header>
  );
}
