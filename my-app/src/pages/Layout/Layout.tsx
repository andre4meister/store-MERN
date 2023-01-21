import { FC, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// import AuthService from 'services/authService';
import styles from './Layout.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Layout, Alert } from 'antd';
import MyHeader from 'components/Header/Header';
import { UserAPI } from 'services/userAPI';
import { fetchGetProfile } from 'store/user/user-thunks';
import Loader from 'components/Loader/Loader';

const { Header, Sider, Content } = Layout;

const MainLayout: FC = () => {
  const { error, isLoading } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchGetProfile());
  }, []);

  useEffect(() => {
    if (error === 'expire token' || error === 'Invalid token') {
      UserAPI.logout();
      if (location.pathname.includes('settings')) {
        navigate('/login', { replace: true });
      }
    }
  }, [error, location]);

  return (
    <>
      <Layout>
        <Sider theme="dark" className={styles.sider} collapsedWidth={0} collapsed={isCollapsed}>
          <Sidebar />
        </Sider>
        <Layout>
          <Header className={styles.header}>
            <MyHeader setIsCollapsed={setIsCollapsed} />
          </Header>
          {/* {isLoading ? (
            <Loader />
          ) : ( */}
          <Content className={styles.content}>
            <Outlet />
          </Content>
          {/* )} */}
        </Layout>
      </Layout>
    </>
  );
};
export default MainLayout;
