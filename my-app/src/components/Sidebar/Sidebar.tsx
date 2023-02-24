import { HeartOutlined, ShoppingCartOutlined, UnorderedListOutlined } from '@ant-design/icons';
import UserAuthMenu from 'components/UserAuthMenu/UserAuthMenu';
import { useAppSelector } from 'hooks/redux';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { selectIsAuth, selectUserData } from 'store/user/user-selectors';
import styles from './Sidebar.module.scss';

interface SidebarMenuType {
  title: string;
  icon: JSX.Element;
  onClick?: () => void;
  link?: string;
}
const sidebarMenu: SidebarMenuType[] = [
  { title: 'Catalog', icon: <ShoppingCartOutlined />, onClick: () => console.log('Catalog') },
  { title: 'Orders', link: '/settings/orders', icon: <UnorderedListOutlined /> },
  { title: 'Cart', link: '/cart', icon: <ShoppingCartOutlined /> },
  { title: 'Favourite', link: '/favourite', icon: <HeartOutlined /> },
];

const Sidebar = () => {
  const { email, userName, firstName } = useAppSelector(selectUserData);
  const isAuth = Boolean(useAppSelector(selectIsAuth));

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__header}>
        <Link to="/">
          <img src="https://content2.rozetka.com.ua/widget_logotype/full/original/229862237.svg" alt="store logo" />
        </Link>
      </div>
      <div className={styles.sidebar__content}>
        <div className={styles.auth}>
          <UserAuthMenu email={email} firstName={firstName} isAuth={isAuth} userName={userName} />
        </div>
        <ul className={styles.sidebar__menu}>
          {sidebarMenu.map((menuItem) => {
            return (
              <li key={menuItem.title} className={styles.sidebar__menuIitem}>
                <Link to={menuItem.link || ''} onClick={menuItem.onClick}>
                  <div className={styles.iconContainer}>{menuItem.icon}</div>
                  <span>{menuItem.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default memo(Sidebar);
