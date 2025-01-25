import { Link, useLocation, matchPath } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './link-with-icon.module.css';

function LinkWithIcon({ Icon, to, className, children }) {
  const location = useLocation();

  const match = matchPath({
    path: to,
    exact: true,
    strict: false,
  }, location.pathname);

  const classes = [ styles.link, match && styles.active, className ]
    .filter(Boolean)
    .join(' ');

  return (
    <Link to={to} className={classes}>
      <Icon type={match ? 'primary' : 'secondary'} />
      {children}
    </Link>
  );
}

LinkWithIcon.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default LinkWithIcon;
