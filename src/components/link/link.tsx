import { Link as BaseLink, useLocation, matchPath } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './link.module.css';

function Link({ Icon, to, className, nested = false, children, ...props }) {
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

Link.propTypes = {
  Icon: PropTypes.elementType,
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
  nested: PropTypes.bool,
};

export default Link;
