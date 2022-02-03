import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoginByTokenMutation } from '../shared/api/auth';
import { useAuth } from '../shared/hooks';
import { ROUTES } from './routes';
import { STATES as AUTH_STATES } from '../pages/Auth/constants';

export function RequireAuth({ children }) {
  const isAuthenticated = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [loginByToken] = useLoginByTokenMutation();

  const accessToken = window.localStorage.getItem('accessToken');

  useEffect(() => {
    if (!isAuthenticated) {
      if (accessToken) {
        loginByToken();
      } else {
        navigate(ROUTES.AUTH, {
          replace: true,
          state: { from: location, page: AUTH_STATES.LOGIN },
        });
      }
    }
  }, [accessToken, isAuthenticated, loginByToken, navigate, location]);

  return children;
}
