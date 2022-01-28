import { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';
import { isUserAuthenticated } from '../reducers/user';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = useSelector(isUserAuthenticated);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
