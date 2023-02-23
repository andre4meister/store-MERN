import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './Settings.module.scss';
import SettingsMenu from '../../components/Settings/SettingsMenu/SettingsMenu';
import { logout } from 'store/user/user';
import cn from 'classnames';
import { useEffect } from 'react';
import UserShouldLogin from 'components/UserShouldLogin/UserShouldLogin';
import { selectUserReducerState } from 'store/user/user-selectors';

const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuth, userData } = useAppSelector(selectUserReducerState);
  const { email, userName } = userData;

  useEffect(() => {
    if (location.pathname === '/settings') {
      navigate('user-info', { replace: true });
    }
  }, [location]);

  if (!isAuth) {
    return <UserShouldLogin pageName="Settings" />;
  }

  return (
    <Row className={styles.container} data-testid="settings-container">
      <Col span={5} push={0} className={styles.menu}>
        <div className={styles.avatar}>
          <li className={styles.menuItem}>
            <NavLink
              to="user-info"
              className={({ isActive }) => cn(styles.profileNavigation, isActive && styles.activeProfileNavigation)}
            >
              <div className={styles.menuItem__icon}>
                <UserOutlined />
              </div>
              <div className={styles.menuItem__name}>
                <div className={styles.name__name} data-testid="auth-userName">
                  {userName}
                </div>
                <div className={styles.name__email} data-testid="auth-email">
                  {email}
                </div>
              </div>
            </NavLink>
          </li>
        </div>
        <SettingsMenu />
        <Row justify="center" align="bottom">
          <Button className={styles.logout} size="large" type="primary" onClick={() => dispatch(logout())}>
            <LogoutOutlined />
            <span>Log out</span>
          </Button>
        </Row>
      </Col>
      <Col className={styles.content}>
        <div className={styles.settings}>
          <Outlet />
        </div>
      </Col>
    </Row>
  );
};

export default SettingsPage;
