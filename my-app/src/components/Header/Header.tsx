import { Dispatch, FC, SetStateAction } from 'react';
import { AppstoreOutlined, HeartOutlined, MenuOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import Button from 'antd/es/button';
import Menu from 'antd/es/menu';
import styles from './Header.module.scss';
import { useAppSelector } from 'hooks/redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserAPI } from 'services/userAPI';
// import logo from '../../assets/images/logo.png';

const { Search } = Input;

interface MyHeaderProps {
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
}
const MyHeader: FC<MyHeaderProps> = ({ setIsCollapsed }) => {
  const navigate = useNavigate();
  const { isAuth, userData } = useAppSelector((state) => state.userReducer);
  const role = userData.role;

  const onLogout = () => {
    UserAPI.logout();
  };

  const onLogin = () => {
    navigate('/login', { replace: true });
  };
  return (
    <>
      <div className={styles.logo__image} onClick={() => navigate('/')}>
        <img src="https://content2.rozetka.com.ua/widget_logotype/full/original/229862237.svg" alt="Buything logo" />
      </div>
      <Button onClick={() => setIsCollapsed((prev) => !prev)} className={styles.collapsedButton}>
        <MenuOutlined className={styles.menuIcon} />
      </Button>
      <div className={styles.catalog}>
        <Button size="large">
          <NavLink to="catalog">
            <AppstoreOutlined />
            <p>Catalog</p>
          </NavLink>
        </Button>
      </div>
      <div className={styles.search}>
        <Search placeholder="I`m looking for..." enterButton="Search" size="large" />
      </div>
      <Menu theme="dark" mode="horizontal" className={styles.menu}>
        <Menu.Item key="favoutire">
          <NavLink to="cart">
            <HeartOutlined className={styles.menuIcon} />
          </NavLink>
        </Menu.Item>
        <Menu.Item key="cart">
          <NavLink to="cart">
            <ShoppingCartOutlined className={styles.menuIcon} />
          </NavLink>
        </Menu.Item>
        <Menu.Item key="user">
          <NavLink to="/settings/user-info">
            <UserOutlined className={styles.menuIcon} />
          </NavLink>
        </Menu.Item>
      </Menu>
      <div className={styles.login}>
        <Button type="primary" size="large" onClick={isAuth ? onLogout : onLogin}>
          {isAuth ? 'Logout' : 'Login'}
        </Button>
      </div>
    </>
  );
};

export default MyHeader;
