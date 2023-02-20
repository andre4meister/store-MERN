import { UnorderedListOutlined, HeartOutlined, EyeOutlined, MessageOutlined, BellOutlined } from '@ant-design/icons';
import UserOrders from 'components/OrderPage/UserOrders/UserOrders';
import UserReviews from 'components/Reviews/UserReviews/UserReviews';
import FavouritesPage from 'pages/FavoutitesPage/FavouritesPage';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';

interface SettingsMenuItem {
  name: string;
  icon: React.ReactNode;
  url: string;
  element: React.ReactNode;
}
export const settingsMenuItems: SettingsMenuItem[] = [
  { name: 'My orders', icon: <UnorderedListOutlined />, url: 'orders', element: <UserOrders /> },
  { name: 'My favourites', icon: <HeartOutlined />, url: 'favourite', element: <FavouritesPage /> },
  { name: 'My view history', icon: <EyeOutlined />, url: 'history', element: <NotFoundPage /> },
  { name: 'My reviews', icon: <MessageOutlined />, url: 'reviews', element: <UserReviews /> },
  { name: 'My notifications', icon: <BellOutlined />, url: 'notifications', element: <NotFoundPage /> },
];
