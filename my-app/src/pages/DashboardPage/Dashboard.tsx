import styles from './Dashboard.module.scss';
import { Button, Col, Row } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { settingsMenuItems } from '../../components/SettingsMenu/SettingsMenu';
import { logout } from 'store/user/user';
import cn from 'classnames';
import { useEffect } from 'react';
import { fetchAllItems, fetchCategories } from 'store/dashboard/dashboard-thunks';
import { LogoutOutlined } from '@ant-design/icons';
import DashboardNav from 'components/DashoboardNav/DashboardNav';
import ItemsList from 'components/ItemsList/ItemsList';
import { ItemType } from 'store/item/item-types';
import { dispatchLogout } from 'store/user/user-thunks';

// const listmock: ItemType[] = [
//   {
//     _id: '63bc3ba31a08d4116934c87d',
//     name: 'Apple Iphone 13 128gb',
//     description: 'Not bad modern phone for all people',
//     category: [],
//     subCategory: [
//       {
//         _id: '63bc382660bbb2f1fdb74767',
//         name: 'Mobiles',
//         description: 'Mobile and other phones',
//         filters: [],
//       },
//     ],
//     price: 1200,
//     isAvailable: true,
//     photos: [
//       'https://content1.rozetka.com.ua/goods/images/big/221214139.jpg',
//       'https://jabko.ua/image/cache/catalog/products/2022/09/081514/iphone-14-pro-finish-select-2022%20(8)-1397x1397.jpg.webp',
//       'https://touch.com.ua/upload/iblock/t9g/t9gtqvrcaiboxna2l022lms60huh0hty.png',
//     ],
//     brand: 'Apple',
//     model: 'Iphone 13',
//   },
//   {
//     _id: '63bc3bce1a08d4116934c885',
//     name: 'Apple Iphone 14 128gb',
//     description: 'Not bad modern phone for people',
//     category: [],
//     subCategory: [
//       {
//         _id: '63bc382660bbb2f1fdb74767',
//         name: 'Mobiles',
//         description: 'Mobile and other phones',
//         filters: [],
//       },
//     ],
//     price: 1200,
//     isAvailable: true,
//     photos: [
//       'https://content1.rozetka.com.ua/goods/images/big/221214139.jpg',
//       'https://jabko.ua/image/cache/catalog/products/2022/09/081514/iphone-14-pro-finish-select-2022%20(8)-1397x1397.jpg.webp',
//       'https://touch.com.ua/upload/iblock/t9g/t9gtqvrcaiboxna2l022lms60huh0hty.png',
//     ],
//     brand: 'Apple',
//     model: 'Iphone 14',
//   },
//   {
//     _id: '63bc3c511a08d4116934c890',
//     name: 'Google Pixel 6 Pro 128gb',
//     description: 'Best 2021 year modern phone',
//     category: [],
//     subCategory: [
//       {
//         _id: '63bc382660bbb2f1fdb74767',
//         name: 'Mobiles',
//         description: 'Mobile and other phones',
//         filters: [],
//       },
//     ],
//     price: 600,
//     isAvailable: false,
//     photos: ['https://content1.rozetka.com.ua/goods/images/big/221214139.jpg'],
//     brand: 'Google',
//     model: 'Pixel 6 Pro',
//   },
//   {
//     _id: '63bc4dd59a5f10608ba8007d',
//     name: 'Vansiton Extra Protein 1,4 kg',
//     description: 'Vansiton Extra Protein 1,4 kg',
//     category: [
//       {
//         _id: '63bc38c6f7c667e7fadb7a13',
//         name: 'Sport',
//         description: 'Things for sport',
//         subCategories: ['63bc382660bbb2f1fdb74767'],
//         filters: [],
//         icon: 'https://uxwing.com/wp-content/themes/uxwing/download/sport-and-awards/tennis-icon.svg',
//       },
//     ],
//     subCategory: [
//       {
//         _id: '63bc4af202ee5b42ad59cf4a',
//         name: 'Vitamins',
//         description: 'Vital vitamins, proteins and other goods for health',
//         filters: [],
//       },
//     ],
//     price: 37,
//     isAvailable: true,
//     photos: ['https://content1.rozetka.com.ua/goods/images/big/292727352.jpg'],
//     brand: 'Vansiton',
//     model: 'Extra pro',
//   },
//   {
//     _id: '63bc4e109a5f10608ba80081',
//     name: 'Olympics Sport Protein 1,4 kg',
//     description: 'Olympics Sport Protein 1,4 kg',
//     category: [
//       {
//         _id: '63bc38c6f7c667e7fadb7a13',
//         name: 'Sport',
//         description: 'Things for sport',
//         subCategories: ['63bc382660bbb2f1fdb74767'],
//         filters: [],
//         icon: 'https://uxwing.com/wp-content/themes/uxwing/download/sport-and-awards/tennis-icon.svg',
//       },
//     ],
//     subCategory: [
//       {
//         _id: '63bc4af202ee5b42ad59cf4a',
//         name: 'Vitamins',
//         description: 'Vital vitamins, proteins and other goods for health',
//         filters: [],
//       },
//     ],
//     price: 37,
//     isAvailable: true,
//     photos: ['https://content1.rozetka.com.ua/goods/images/big/292727352.jpg'],
//     brand: 'Olympics Sport',
//     model: 'Hundred version',
//   },
//   {
//     _id: '63bc4e2f9a5f10608ba80085',
//     name: 'Olympics Sport Protein 1 kg',
//     description: 'Olympics Sport Protein 1 kg',
//     category: null,
//     subCategory: null,
//     price: 37,
//     isAvailable: true,
//     photos: ['https://content1.rozetka.com.ua/goods/images/big/292727352.jpg'],
//     brand: 'Olympics Sport',
//     model: 'Hundred version',
//   },
//   {
//     _id: '63bc4e3f9a5f10608ba80089',
//     name: 'Olympics Sport Protein 4 kg',
//     description: 'Olympics Sport Protein 4 kg',
//     category: null,
//     subCategory: null,
//     price: 37,
//     isAvailable: true,
//     photos: ['https://content1.rozetka.com.ua/goods/images/big/292727352.jpg'],
//     brand: 'Olympics Sport',
//     model: 'Hundred version',
//   },
// ];

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { categories, error, subCategories, likedItems } = useAppSelector((state) => state.dashboardReducer);
  const { email, userName, firstName } = useAppSelector((state) => state.userReducer.userData);
  const { isAuth } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories({}));
      dispatch(fetchAllItems());
    }
  }, []);

  return (
    <Row className={styles.container}>
      <Col span={5} push={0} className={styles.userMenu}>
        <DashboardNav />
        <ul className={styles.menu__ul}>
          <li className={styles.avatar}>
            {isAuth ? (
              <NavLink
                to="user-info"
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
          <img
            src="https://content.rozetka.com.ua/banner_category/image/original/303439568.jpg"
            alt="discount slider"
          />
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
