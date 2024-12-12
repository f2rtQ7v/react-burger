import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Link from '../link/link.tsx';

import styles from './app-header.module.css';

const links = [
  { Icon:  BurgerIcon, type:   'primary', text:    'Конструктор', id: 'burgerConstructor' },
  { Icon:    ListIcon, type: 'secondary', text:  'Лента заказов', id:            'orders' },
  { Icon: ProfileIcon, type: 'secondary', text: 'Личный кабинет', id:           'account' },
];

export default () => (
  <header className={styles.header}>
    <nav className={styles.nav}>
      {links.map(({ Icon, type, text, id }) => (
        <Link key={id} className={styles[id]}>
          <Icon type={type} />
          <span>{text}</span>
        </Link>
      ))}
      <div className={styles.logo}>
        <Logo />
      </div>
    </nav>
  </header>
);
