import styles from './App.module.scss';
import { FC } from 'react';
import { Route, createHashRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import SettingsPage from './pages/SettingPage/SettingsPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Dashboard from './pages/DashboardPage/Dashboard';
import ItemPage from './pages/ItemPage/ItemMainPage';
import OrderPage from './pages/OrderPage/OrderPage';
import CartPage from 'pages/CartPage/CartPage';
import RegistrationForm from 'pages/AuthPage/RegisterForm';
import LoginForm from 'pages/AuthPage/LoginForm';
import AllProfileSettings from 'components/Settings/ProfileSettings/ProfileSettings';
import FavouritesPage from 'pages/FavoutitesPage/FavouritesPage';
import { settingsMenuItems } from 'utils/settings/settingsMenu';
import ItemReviewsPage from 'pages/ItemReviewsPage/ItemReviewsPage';
import ItemPageContainer from 'pages/ItemPage/ItemPageContainer';

export interface ItemNavigationType {
  name: string;
  link: string;
  Component?: React.ReactNode;
}

export const itemNavArray: ItemNavigationType[] = [
  { name: 'GeneralInfo', link: 'main', Component: <ItemPage /> },
  { name: 'Characteristics', link: 'characteristics', Component: <NotFoundPage /> },
  { name: 'Reviews', link: 'reviews', Component: <ItemReviewsPage /> },
  { name: 'Questions', link: 'questions', Component: <NotFoundPage /> },
  { name: 'Photos', link: 'photos', Component: <NotFoundPage /> },
];

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="item/:id" element={<ItemPageContainer />}>
        {itemNavArray.map((navItem) => {
          return <Route path={navItem.link} element={navItem.Component} key={navItem.name} />;
        })}
      </Route>
      <Route path="favourite" element={<FavouritesPage />} />
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
