import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { Suspense, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import type { RadioChangeEvent } from 'antd';
import type { DotPosition } from 'antd/es/carousel';
import { Breadcrumb } from 'antd';
import { fetchAllItems } from 'store/dashboard/dashboard-thunks';
import styles from './ItemPage.module.scss';
import { fetchItemById } from 'store/item/item-thunks';
import classNames from 'classnames';
import ItemPageNav from 'components/ItemPageNav/ItemPageNav';
import { RightOutlined } from '@ant-design/icons';
import { ItemType } from 'store/item/item-types';
import Loader from 'components/Loader/Loader';
import Slider from 'components/Slider/Slider';

const ItemsList = React.lazy(() => import('../../components/ItemsList/ItemsList'));

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

const ItemPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { error, likedItems } = useAppSelector((state) => state.dashboardReducer);
  const { email, userName, firstName } = useAppSelector((state) => state.userReducer.userData);
  const { isAuth } = useAppSelector((state) => state.userReducer);
  const { itemInfo } = useAppSelector((state) => state.itemReducer);

  const { _id, category, description, isAvailable, name, photos, price, subCategory, brand, discountPrice, model } =
    itemInfo;

  const [dotPosition, setDotPosition] = useState<DotPosition>('top');
  const handlePositionChange = ({ target: { value } }: RadioChangeEvent) => {
    setDotPosition(value);
  };

  useEffect(() => {
    dispatch(fetchAllItems());
  }, []);

  useEffect(() => {
    if (!itemInfo._id || id !== itemInfo._id) dispatch(fetchItemById({ id: id || '' }));
  }, [itemInfo._id, id]);

  if (!_id) {
    return <Loader />;
  }
  return (
    <main className={styles.container}>
      <div className={styles.breadcrumb}>
        <Breadcrumb separator={<RightOutlined className={styles.breadcrumbSeparator} />}>
          <Breadcrumb.Item>
            <NavLink to="/">Dashboard</NavLink>
          </Breadcrumb.Item>
          {/* <Breadcrumb.Item href="#">{category.name}</Breadcrumb.Item>
          <Breadcrumb.Item href="/#">{subCategory.name}</Breadcrumb.Item> */}
          <Breadcrumb.Item href="/#">{name}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={styles.title}>{name}</div>
      <div className={styles.stars}>5 stars</div>
      <div className={styles.navigationTabs}>
        <ItemPageNav />
      </div>
      <div className={styles.aboutContainer}>
        <div className={classNames(styles.shortDescription, styles.aboutItem)}>
          <Slider photos={photos} />
        </div>
        <div className={classNames(styles.optionsAndPrice, styles.aboutItem)}>optionsAndPrice</div>
      </div>
      <div className={styles.recommendations}>
        <Suspense fallback={<h1>loading...</h1>}>
          <ItemsList title="Recommendations" key="recommendations" items={likedItems} oneLine />
        </Suspense>
      </div>
      <div className={styles.generalCharacteristics}>characteristics</div>
    </main>
  );
};

export default ItemPage;
