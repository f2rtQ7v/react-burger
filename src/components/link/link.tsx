import { ReactNode } from 'react';
import { Link as BaseLink, useLocation, matchPath } from 'react-router-dom';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import styles from './link.module.css';

interface ILinkProps {
  Icon?: ({ type }: TIconProps) => ReactNode;
  to: string;
  className: string;
  nested?: boolean;
  children: ReactNode;
}

export default function Link({
  Icon,
  to,
  className = '',
  nested = false,
  children,
  ...props
}: ILinkProps) {
  const location = useLocation();

  const match = matchPath({
    path: to,
    end: !nested,
  }, location.pathname);

  const classes = [ styles.link, match && styles.active, className ]
    .filter(Boolean)
    .join(' ');

  return (
    <BaseLink to={to} className={classes} {...props}>
      {Icon && <Icon type={match ? 'primary' : 'secondary'} />}
      {children}
    </BaseLink>
  );
}
