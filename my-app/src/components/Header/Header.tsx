import { Dispatch, FC, SetStateAction, useState } from 'react';
import {
  AppstoreOutlined,
  CloseOutlined,
  HeartOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Badge, Modal } from 'antd';
import Button from 'antd/es/button';
import Menu from 'antd/es/menu';
import styles from './Header.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserAPI } from 'services/userAPI';
import { fetchItemsWithFilters } from 'store/dashboard/dashboard-thunks';
import MySearch from '../Search/Search';
import Catalog from 'components/Catalog/Catalog';
import { ObjectWithStringValues } from 'store/commonTypes';
import Loader from 'components/Loader/Loader';
import { countCartItems, countLikedItems } from 'utils/userUtils/countItems';
import classNames from 'classnames';

interface MyHeaderProps {
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
}

const MyHeader: FC<MyHeaderProps> = ({ setIsCollapsed }) => {
  const navigate = useNavigate();
  const { isAuth, userData } = useAppSelector((state) => state.userReducer);
  const { searchedItems } = useAppSelector((state) => state.dashboardReducer);

  const dispatch = useAppDispatch();

  const [catalogIsOpen, setCatalogIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchedFocused, setIsSearchedFocused] = useState(false);

  const changeCatelogIsOpen = () => {
    setCatalogIsOpen((prev) => !prev);
  };

  const onLogout = () => {
    UserAPI.logout();
  };

  const onLogin = () => {
    navigate('/login', { replace: true });
  };

  const fetchSearchValue = (value: ObjectWithStringValues) => {
    setIsSearching(true);
    dispatch(fetchItemsWithFilters(value));
  };

  if (isAuth === undefined) {
    return <Loader />;
  }

  return (
    <div className={styles.headerContainer}>
      {catalogIsOpen ? (
        <Modal
          open={catalogIsOpen}
          className={styles.modalCatalog}
          onCancel={() => setCatalogIsOpen(false)}
          footer={null}
        >
          <Catalog />
        </Modal>
      ) : null}
      <div className={styles.logo__image} onClick={() => navigate('/')}>
        <img src="https://content2.rozetka.com.ua/widget_logotype/full/original/229862237.svg" alt="Buything logo" />
      </div>
      <Button onClick={() => setIsCollapsed((prev) => !prev)} className={styles.collapsedButton}>
        <MenuOutlined className={styles.menuIcon} />
      </Button>
      <div className={styles.catalog}>
        <Button size="large" onClick={changeCatelogIsOpen}>
          {catalogIsOpen ? <CloseOutlined /> : <AppstoreOutlined />}
          <p>Catalog</p>
        </Button>
      </div>
      <div className={styles.search}>
        <MySearch
          fetchSearchValue={fetchSearchValue}
          isSearchedFocused={isSearchedFocused}
          isSearching={isSearching}
          searchValue={searchValue}
          searchedItems={searchedItems}
          setIsSearchedFocused={setIsSearchedFocused}
          setIsSearching={setIsSearching}
          setSearchValue={setSearchValue}
        />
      </div>
      <Menu theme="dark" mode="horizontal" className={styles.menu}>
        <Menu.Item key="favoutire" className={classNames(styles.menuItem)}>
          <NavLink to="favourite">
            <Badge
              status="processing"
              count={countLikedItems(userData.likedItems)}
              size="small"
              offset={[30, -20]}
              className={styles.badge}
            />
            <HeartOutlined className={styles.menuIcon} />
          </NavLink>
        </Menu.Item>
        <Menu.Item key="cart" className={classNames(styles.menuItem, styles.menuCart)}>
          <NavLink to="cart">
            <Badge
              status="processing"
              count={countCartItems(userData.cart)}
              size="small"
              offset={[30, -20]}
              className={styles.badge}
            />
            <ShoppingCartOutlined className={styles.menuIcon} />
          </NavLink>
        </Menu.Item>
        <Menu.Item key="user" className={classNames(styles.menuItem)}>
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
    </div>
  );
};

export default MyHeader;
