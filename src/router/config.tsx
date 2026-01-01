import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/home/page'));
const LoginPage = lazy(() => import('../pages/login/page'));
const AdminPage = lazy(() => import('../pages/admin/page'));
const UserPage = lazy(() => import('../pages/user/page'));
const NotFound = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/admin',
    element: <AdminPage />
  },
  {
    path: '/user',
    element: <UserPage />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;
