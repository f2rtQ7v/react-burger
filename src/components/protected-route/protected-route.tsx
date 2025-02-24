import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuthState } from '../../services/auth/slice.ts';
import { LoadingScreen } from '../screens/screens.jsx';

interface IProtected {
  onlyUnAuth?: boolean;
  element: JSX.Element;
}

const Protected = ({ onlyUnAuth = false, element }: IProtected) => {
  const { isAuthChecked, user } = useSelector(getAuthState);
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
export const OnlyUnAuth = ({ element }: IProtected) => (
  <Protected onlyUnAuth={true} element={element} />
);
