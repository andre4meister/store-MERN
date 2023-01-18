import styles from './App.module.scss';
import { FC } from 'react';
import { Route, createHashRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import SettingsPage from './pages/SettingPage/SettingsPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Dashboard from './pages/DashboardPage/Dashboard';
import ItemPage from './pages/ItemPage/ItemPage';
import OrderPage from './pages/OrderPage/OrderPage';
import CartPage from 'pages/CartPage/CartPage';
import RegistrationForm from 'pages/AuthPage/RegisterForm';
import LoginForm from 'pages/AuthPage/LoginForm';
import { settingsMenuItems } from 'components/SettingsMenu/SettingsMenu';
import AllProfileSettings from 'components/ProfileSettings/ProfileSettings';

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="item/:id" element={<ItemPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="order" element={<OrderPage />} />
      <Route path="settings" element={<SettingsPage />}>
        <Route path="user-info" element={<AllProfileSettings />} />
        {settingsMenuItems.map((item) => {
          return <Route path={item.url} element={item.element} key={item.name} />;
        })}
      </Route>
      <Route path="registration" element={<RegistrationForm />} />
      <Route path="login" element={<LoginForm />} />
      <Route index element={<Dashboard />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);

const App: FC = () => (
  <div id="app" className={styles.app}>
    <RouterProvider router={router} />
  </div>
);

export default App;
