import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../shared/hooks';
import { ROUTES } from './routes';
import { STATES as AUTH_STATES } from '../pages/Auth/constants';

export function RequireAuth({ children }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth) {
    // Save current location to redirect user there after login
    return (
      <Navigate
        to={ROUTES.AUTH}
        state={{ from: location, page: AUTH_STATES.LOGIN }}
        replace
      />
    );
  }

  return children;
}
