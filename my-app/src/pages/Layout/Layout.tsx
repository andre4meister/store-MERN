import { FC, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// import AuthService from 'services/authService';
import styles from './Layout.module.scss';
import { useAppSelector } from '../../hooks/redux';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Layout } from 'antd';
import MyHeader from 'components/Header/Header';
import { UserAPI } from 'services/userAPI';

const { Header, Sider, Content } = Layout;

const MainLayout: FC = () => {
  const user = useAppSelector((state) => state.userReducer.error);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const isAuth = JSON.parse(localStorage.getItem('isAuth') || 'false') as boolean;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user === 'expire token') {
      UserAPI.logout();
      if (location.pathname.includes('settings')) {
        navigate('/login', { replace: true });
      }
    }
  }, [user, location]);

  return (
    <Layout>
      <Sider theme="dark" className={styles.sider} collapsedWidth={0} collapsed={isCollapsed}>
        <Sidebar />
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <MyHeader setIsCollapsed={setIsCollapsed} />
        </Header>
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
