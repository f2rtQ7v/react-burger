import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Link from '../link/link.jsx';
import styles from './app-header.module.css';

const links = [
  { Icon:  BurgerIcon, text:    'Конструктор', id: 'burgerConstructor' },
  { Icon:    ListIcon, text:  'Лента заказов', id:            'orders', disabled: true },
  { Icon: ProfileIcon, text: 'Личный кабинет', id:           'account', disabled: true },
];

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {links.map(({ Icon, text, id, disabled = false }) => (
          <Link key={id} className={styles[id]} disabled={disabled}>
            <Icon type={disabled ? 'secondary' : 'primary'} />
            <span>{text}</span>
          </Link>
        ))}
        <div className={styles.logo}>
          <Logo />
        </div>
      </nav>
    </header>
  );
}
