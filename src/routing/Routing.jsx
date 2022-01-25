import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './routes';
import { Auth, Home } from '../pages';

export function Routing() {
  return (
    <Routes>
      <Route exact path={ROUTES.HOME} element={<Home />} />
      <Route exact path={ROUTES.AUTH} element={<Auth />} />
    </Routes>
  );
}
