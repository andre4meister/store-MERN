import { FC, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './Layout.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Layout } from 'antd';
import MyHeader from 'components/Header/Header';
import { UserAPI } from 'services/userAPI';
import { fetchGetProfile } from 'store/user/user-thunks';
import Loader from 'components/Loader/Loader';
import { fetchCategories } from 'store/dashboard/dashboard-thunks';
import AppErrorPage from 'components/AppErrorPage/AppErrorPage';

const { Header, Sider, Content } = Layout;

const MainLayout: FC = () => {
  const { loginError, isAuth } = useAppSelector((state) => state.userReducer);
  const { appError, isLoading } = useAppSelector((state) => state.appReducer);

  const dispatch = useAppDispatch();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchCategories({}));
    dispatch(fetchGetProfile());
  }, []);

  useEffect(() => {
    if (loginError === 'expire token' || loginError === 'Invalid token') {
      UserAPI.logout();
      if (location.pathname.includes('settings')) {
        navigate('/login', { replace: true });
      }
    }
  }, [loginError, location.pathname]);

  if (isAuth === undefined) {
    return <Loader />;
  }

  return (
    <Layout>
      <Sider theme="dark" className={styles.sider} collapsedWidth={0} collapsed={isSidebarCollapsed}>
        <Sidebar />
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <MyHeader setIsCollapsed={setIsSidebarCollapsed} />
        </Header>
        <Content className={styles.content}>
          {isLoading || isAuth === undefined ? (
            <Loader />
          ) : appError ? (
            <AppErrorPage appError={appError} />
          ) : (
            <Outlet />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
