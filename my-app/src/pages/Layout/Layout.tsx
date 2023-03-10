import { FC, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './Layout.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Layout, Modal } from 'antd';
import MyHeader from 'components/Header/Header';
import { UserAPI } from 'services/userAPI';
import { fetchGetProfile } from 'store/user/user-thunks';
import Loader from 'components/Loader/Loader';
import { fetchCategories } from 'store/dashboard/dashboard-thunks';
import AppErrorPage from 'components/AppErrorPage/AppErrorPage';
import { selectIsAuth, selectLoginError } from 'store/user/user-selectors';
import { selectAppError, selectIsLoading } from 'store/app/app-selectors';
import { CloseOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

const MainLayout: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(selectIsAuth);
  const loginError = useAppSelector(selectLoginError);
  const appError = useAppSelector(selectAppError);
  const isLoading = useAppSelector(selectIsLoading);
  const categories = useAppSelector((state) => state.dashboardReducer.categories);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

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

  if (isAuth === undefined || categories.length === 0) {
    return <Loader />;
  }

  return (
    <Layout>
      {isSidebarCollapsed ? null : (
        <Modal
          bodyStyle={{ padding: 0, backgroundColor: '#001529' }}
          open={!isSidebarCollapsed}
          closeIcon={<CloseOutlined style={{ color: '#fff' }} />}
          footer={null}
          className={styles.sidebarModal}
          onCancel={() => setIsSidebarCollapsed((prev) => !prev)}
        >
          <Sidebar />
        </Modal>
      )}
      <Layout className={styles.antLayout}>
        <Header className={styles.header}>
          <MyHeader setIsCollapsed={setIsSidebarCollapsed} />
        </Header>
        <Content className={styles.content}>{appError ? <AppErrorPage appError={appError} /> : <Outlet />}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
