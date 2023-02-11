import styles from './Dashboard.module.scss';
import { Button, Col, Row } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { settingsMenuItems } from '../../components/SettingsMenu/SettingsMenu';
import cn from 'classnames';
import { useEffect } from 'react';
import { fetchItems } from 'store/dashboard/dashboard-thunks';
import { LogoutOutlined } from '@ant-design/icons';
import DashboardNav from 'components/DashoboardNav/DashboardNav';
import ItemsList from 'components/ItemsList/ItemsList';
import { dispatchLogout } from 'store/user/user-thunks';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { categories, subCategories, likedItems } = useAppSelector((state) => state.dashboardReducer);
  const { appError } = useAppSelector((state) => state.appReducer);
  const { email, userName, firstName } = useAppSelector((state) => state.userReducer.userData);
  const { isAuth } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(fetchItems());
  }, []);

  return (
    <Row className={styles.container}>
      <Col span={5} push={0} className={styles.userMenu}>
        <DashboardNav />
        <ul className={styles.menu__ul}>
          <li className={styles.avatar}>
            {isAuth ? (
              <NavLink
                to="/settings/user-info"
                className={({ isActive }) => cn(styles.profileNavigation, isActive && styles.activeProfileNavigation)}
              >
                <div className={styles.userMenuItem__icon}>{firstName ? firstName.charAt(0) : ''}</div>
                <div className={styles.userMenuItem__name}>
                  <div className={styles.name__name}>{userName}</div>
                  <div className={styles.name__email}>{email}</div>
                </div>
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) => cn(styles.profileNavigation, isActive && styles.activeProfileNavigation)}
              >
                <div className={styles.userMenuItem__name}>You are not logged in, login</div>
              </NavLink>
            )}
          </li>

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
          <Button className={styles.logout} size="large" type="primary" onClick={() => dispatch(dispatchLogout())}>
            <LogoutOutlined />
            <span>Log out</span>
          </Button>
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
