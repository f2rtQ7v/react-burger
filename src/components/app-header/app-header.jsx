import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import LinkWithIcon from '../link-with-icon/link-with-icon.jsx';
import styles from './app-header.module.css';

const links = [
  { Icon:  BurgerIcon, to:        '/', text:    'Конструктор', id: 'burgerConstructor' },
  { Icon:    ListIcon, to:    '/feed', text:  'Лента заказов', id:            'orders' },
  { Icon: ProfileIcon, to: '/profile', text: 'Личный кабинет', id:           'account' },
];

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {links.map(({ text, id, ...props }) => (
          <LinkWithIcon key={id} className={styles[id]} {...props}>
            {text}
          </LinkWithIcon>
        ))}
        <div className={styles.logo}>
          <Logo />
        </div>
      </nav>
    </header>
  );
}
