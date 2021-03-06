import { Routes, Route } from 'react-router-dom';
import { Auth, Catalog, Home, UserProfile } from '../pages';
import { RequireAuth } from './RequireAuth';
import { ROUTES } from './routes';

export function Routing() {
  return (
    <Routes>
      <Route exact path={ROUTES.HOME} element={<Home />} />
      <Route exact path={ROUTES.AUTH} element={<Auth />} />
      <Route
        exact
        path={ROUTES.CATALOG}
        element={
          <RequireAuth>
            <Catalog />
          </RequireAuth>
        }
      />
      <Route
        exact
        path={ROUTES.PROFILE}
        element={
          <RequireAuth>
            <UserProfile />
          </RequireAuth>
        }
      />
    </Routes>
  );
}
