import { BellOutlined, EyeOutlined, HeartOutlined, MessageOutlined, UnorderedListOutlined } from '@ant-design/icons';
import CartPage from 'pages/CartPage/CartPage';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import OrderPage from 'pages/OrderPage/OrderPage';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from '../../pages/SettingPage/Settings.module.scss';

export const settingsMenuItems = [
  { name: 'My orders', icon: <UnorderedListOutlined />, url: 'order', element: <OrderPage /> },
  { name: 'My favourites', icon: <HeartOutlined />, url: 'favourite', element: <CartPage /> },
  { name: 'My view history', icon: <EyeOutlined />, url: 'history', element: <NotFoundPage /> },
  { name: 'My reviews', icon: <MessageOutlined />, url: 'reviws', element: <NotFoundPage /> },
  { name: 'My notifications', icon: <BellOutlined />, url: 'notifications', element: <NotFoundPage /> },
];

const SettingsMenu = () => {
  return (
    <ul className={styles.menu__ul}>
      {settingsMenuItems.map((menuItem) => {
        return (
          <li className={styles.menuItem} key={menuItem.name + menuItem.url}>
            <NavLink
              to={menuItem.url}
              className={({ isActive }) => cn(styles.profileNavigation, isActive && styles.activeProfileNavigation)}
            >
              <div className={styles.menuItem__icon}>{menuItem.icon}</div>
              <div className={styles.menuItem__name}>{menuItem.name}</div>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default SettingsMenu;
