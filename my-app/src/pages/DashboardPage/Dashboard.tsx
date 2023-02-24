import styles from './Dashboard.module.scss';
import { Button, Col, Row } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { NavLink, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { useEffect } from 'react';
import { fetchItems } from 'store/dashboard/dashboard-thunks';
import { LogoutOutlined } from '@ant-design/icons';
import DashboardNav from 'components/DashoboardNav/DashboardNav';
import ItemsList from 'components/Item/ItemsList/ItemsList';
import { dispatchLogout } from 'store/user/user-thunks';
import { settingsMenuItems } from 'utils/settings/settingsMenu';
import { selectLikedItems } from 'store/dashboard/dashboard-selectors';
import { selectIsAuth, selectUserData } from 'store/user/user-selectors';
import UserAuthMenu from 'components/UserAuthMenu/UserAuthMenu';

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const likedItems = useAppSelector(selectLikedItems);
  const { email, userName, firstName } = useAppSelector(selectUserData);
  const isAuth = Boolean(useAppSelector(selectIsAuth));

  const navigateToLogin = () => {
    navigate('/login');
  };

  useEffect(() => {
    if (likedItems.length === 0) {
      dispatch(fetchItems());
    }
  }, []);

  return (
    <Row className={styles.container}>
      <Col span={5} push={0} className={styles.userMenu}>
        <DashboardNav />
        <ul className={styles.menu__ul}>
          <UserAuthMenu email={email} firstName={firstName} isAuth={isAuth} userName={userName} />
          {settingsMenuItems.map((userMenuItem) => {
            return (
              <li className={styles.userMenuItem} key={userMenuItem.name + userMenuItem.url}>
                <NavLink
                  to={userMenuItem.url}
                  className={({ isActive }) => cn(styles.profileNavigation, isActive && styles.activeProfileNavigation)}
                >
                  <div className={styles.userMenuItem__name}>{userMenuItem.name}</div>
                </NavLink>
              </li>
            );
          })}
        </ul>
        <Row justify="center" align="bottom">
          {isAuth ? (
            <Button className={styles.logout} size="large" type="primary" onClick={() => dispatch(dispatchLogout())}>
              <LogoutOutlined />
              <span>Log out</span>
            </Button>
          ) : (
            <Button className={styles.logout} size="large" type="primary" onClick={navigateToLogin}>
              <LogoutOutlined />
              <span>Login</span>
            </Button>
          )}
        </Row>
      </Col>
      <Col className={styles.content}>
        <div className={styles.slider}>
          <img src="https://content.rozetka.com.ua/files/images/original/311680078.jpg" alt="discount slider" />
        </div>
        <div className={styles.dashboardLists}>
          <ItemsList items={likedItems} title="Last seen items" oneLine={true} />
          <ItemsList items={likedItems.slice(0, 6)} title="Hot discounts" oneLine={true} />
          <ItemsList items={likedItems.slice(0, 6)} title="Recommended items" oneLine={true} />
        </div>
      </Col>
    </Row>
  );
};

export default Dashboard;
