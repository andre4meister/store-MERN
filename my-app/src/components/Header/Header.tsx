import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react';
import {
  AppstoreOutlined,
  CloseOutlined,
  HeartOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Input } from 'antd';
import Button from 'antd/es/button';
import Menu from 'antd/es/menu';
import styles from './Header.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserAPI } from 'services/userAPI';
import { fetchItemsWithFilters } from 'store/dashboard/dashboard-thunks';
import { debounce } from '../../utils/debounce';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { setSearchedItems } from 'store/dashboard/dashboard';
import Catalog from 'components/Catalog/Catalog';
import { ObjectWithStringValues } from 'store/commonTypes';

const { Search } = Input;

interface MyHeaderProps {
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
}

const MyHeader: FC<MyHeaderProps> = ({ setIsCollapsed }) => {
  const navigate = useNavigate();
  const { isAuth, userData } = useAppSelector((state) => state.userReducer);
  const { searchedItems } = useAppSelector((state) => state.dashboardReducer);

  const dispatch = useAppDispatch();

  const [catalogIsOpen, setCatalogIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isSearchedFocused, setIsSearchedFocused] = useState(false);

  const changeCatelogIsOpen = () => {
    setCatalogIsOpen((prev) => !prev);
  };

  const onSearchBlur = () => {
    setSearchedItems([]);
    setIsSearchedFocused(false);
  };
  const onLogout = () => {
    UserAPI.logout();
  };

  const onLogin = () => {
    navigate('/login', { replace: true });
  };

  const fetchSearchValue = (value: ObjectWithStringValues) => {
    console.log('fetch', value);
    setIsSearching(true);
    dispatch(fetchItemsWithFilters(value));
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const debouncedChangeHandler = useCallback(debounce(onSearchChange, 1000), []);

  useEffect(() => {
    if (searchValue !== '') {
      fetchSearchValue({ name: searchValue });
      setIsSearching(false);
    }
  }, [searchValue]);

  return (
    <>
      {catalogIsOpen ? <Catalog /> : null}
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
      <div className={cn(styles.search, isSearchedFocused && styles.extendedSearch)} onBlur={onSearchBlur}>
        <Search
          className={styles.searchSpan}
          onFocus={() => setIsSearchedFocused(true)}
          placeholder="I`m looking for..."
          enterButton="Search"
          size="large"
          onChange={debouncedChangeHandler}
          loading={isSearching}
        />
        {searchValue && isSearchedFocused ? (
          <ul className={styles.searchedItems}>
            {searchedItems.length ? (
              searchedItems.map((item) => {
                return (
                  <li className={styles.searchedListItem} key={item._id}>
                    <Link to={`/item/${item._id}`}>
                      <div className={styles.imageContainer}>
                        <img src={item.photos[0]} alt={item.name} />
                      </div>
                      <div className={styles.nameAndCategory}>
                        <div>{item.name}</div>
                      </div>
                    </Link>
                  </li>
                );
              })
            ) : (
              <span>Items with such name not found</span>
            )}
          </ul>
        ) : null}
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
