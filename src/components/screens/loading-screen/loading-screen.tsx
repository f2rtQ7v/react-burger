import PropTypes from 'prop-types';
import styles from './loading-screen.module.css';

function LoadingScreen({ transparent = false, children }) {
  const classes = [ styles.container, transparent && styles.transparent ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <div className={styles.spinner}></div>
      {children}
    </div>
  );
}

LoadingScreen.propTypes = {
  transparent: PropTypes.bool,
};

export default LoadingScreen;
