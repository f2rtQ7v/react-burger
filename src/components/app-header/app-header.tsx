import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Link from '../link/link.tsx';

import styles from './app-header.module.css';

const links = [
  { Icon:  BurgerIcon, type:   'primary', text:    'Конструктор', className: 'construct' },
  { Icon:    ListIcon, type: 'secondary', text:  'Лента заказов', className:    'orders' },
  { Icon: ProfileIcon, type: 'secondary', text: 'Личный кабинет', className:   'account' },
];

export default () => (
  <header className="text text_type_main-default p-4">
    <nav className={styles.nav}>
      {links.map(({ Icon, type, text, className }) => (
        <Link className={styles[className]}>
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
