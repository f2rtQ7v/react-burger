import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoadingScreen from '../screens/loading-screen/loading-screen.jsx';

const Protected = ({ onlyUnAuth = false, element }) => {
  const { isAuthChecked, user } = useSelector(state => state.auth);
  const location = useLocation();

  if (!isAuthChecked) {
    return <LoadingScreen />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from ?? { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  if (!onlyUnAuth && !user) {
    const from = location.state?.from ?? location;
    if (from.pathname === '/profile/logout') {
      from.pathname = '/';
    }

    return <Navigate replace to="/login" state={{ from }} />;
  }

  return element;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ element }) => (
  <Protected onlyUnAuth={true} element={element} />
);

OnlyAuth.propTypes = {
  element: PropTypes.node.isRequired,
  onlyUnAuth: PropTypes.bool,
};

OnlyUnAuth.propTypes = {
  element: PropTypes.node.isRequired,
};
