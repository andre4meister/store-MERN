import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { Suspense, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Breadcrumb, Button } from 'antd';
import { fetchItems } from 'store/dashboard/dashboard-thunks';
import styles from './ItemPage.module.scss';
import { fetchItemById } from 'store/item/item-thunks';
import classNames from 'classnames';
import ItemPageNav from 'components/ItemPageNav/ItemPageNav';
import { RightOutlined } from '@ant-design/icons';
import Loader from 'components/Loader/Loader';
import Slider from 'components/Slider/Slider';
import { ItemType } from 'store/item/item-types';
import { UserType } from 'store/user/user-types';
import ItemAveragePoint from 'components/ItemAveragePoint/ItemAveragePoint';
import { CategoryType } from 'store/category/category-types';

const ItemsList = React.lazy(() => import('../../components/ItemsList/ItemsList'));
const mockItem: ItemType = {
  _id: '63bc3ba31a08d4116934c87d',
  name: 'Apple Iphone 13 128gb',
  description: 'Not bad modern phone for all people',
  category: {} as CategoryType,
  subCategory: {
    _id: '63bc382660bbb2f1fdb74767',
    photo: '',
    name: 'Mobiles',
    description: 'Mobile and other phones',
    filters: [],
  },
  reviews: [
    { author: {} as UserType, point: 1, text: 'Good, I`d buy again', _id: 'ogdfg645' },
    { author: {} as UserType, point: 2, text: 'Good, I`d buy again', _id: 'ogdfg653545' },
    { author: {} as UserType, point: 1, text: 'Good, I`d buy again', _id: '53ogdfg645' },
    { author: {} as UserType, point: 5, text: 'Good, I`d buy again', _id: '56467ogdfg645' },
    { author: {} as UserType, point: 4, text: 'Good, I`d buy again', _id: 'o53253235gdfg645' },
  ],
  price: 1200,
  isAvailable: true,
  photos: [
    'https://content1.rozetka.com.ua/goods/images/big/221214139.jpg',
    'https://touch.com.ua/upload/iblock/t9g/t9gtqvrcaiboxna2l022lms60huh0hty.png',
  ],
  brand: 'Apple',
  model: 'Iphone 13',
};

const ItemPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { likedItems } = useAppSelector((state) => state.dashboardReducer);
  const { appError } = useAppSelector((state) => state.appReducer);
  const { email, userName, firstName } = useAppSelector((state) => state.userReducer.userData);
  const { isAuth } = useAppSelector((state) => state.userReducer);
  const { itemInfo } = useAppSelector((state) => state.itemReducer);

  const {
    _id,
    category,
    description,
    isAvailable,
    name,
    photos,
    reviews,
    price,
    subCategory,
    brand,
    discountPrice,
    model,
  } = mockItem;

  useEffect(() => {
    dispatch(fetchItems());
  }, []);

  useEffect(() => {
    if (!itemInfo._id || id !== itemInfo._id) dispatch(fetchItemById({ id: id || '' }));
  }, [itemInfo._id, id]);

  if (!_id) {
    return <Loader />;
  }
  return (
    <main className={styles.container}>
      <div className={styles.generalInfo}>
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
        <div className={styles.stars}>
          <ItemAveragePoint reviews={reviews} />
        </div>
      </div>
      <div className={styles.navigationTabs}>
        <ItemPageNav />
      </div>
      <div className={styles.aboutContainer}>
        <div className={classNames(styles.shortDescription, styles.aboutItem)}>
          <Slider photos={photos} />
        </div>
        <div className={classNames(styles.optionsAndPrice, styles.aboutItem)}>
          <div className={classNames(styles.buyBlock, styles.itemInfoBlock)}>
            <div className={styles.prices}>
              <span className={isAvailable ? styles.available : styles.notAvailable}>
                {isAvailable ? 'Available' : 'Out of stock'}
              </span>
              <span className={styles.discountPrice}>{discountPrice ? discountPrice + ' $' : null}</span>
              <span className={classNames(styles.price, discountPrice && styles.hotPrice)}>{price + '$'}</span>
            </div>
            <div className={styles.buttonsContainer}>
              <Button className={styles.button} size="large" type="primary">
                Buy now
              </Button>
              <Button className={styles.button} size="large" type="default">
                Add to cart
              </Button>
            </div>
          </div>
          <div className={classNames(styles.description, styles.itemInfoBlock)}>
            <h1>Description</h1>
            <p>{description}</p>
          </div>
          <div className={classNames(styles.delivery, styles.itemInfoBlock)}>
            <h1>Delivery</h1>
            <p>delivery options</p>
          </div>
          <div className={classNames(styles.payment, styles.itemInfoBlock)}>
            <h1>Payment</h1>
            <p>payment options</p>
          </div>
        </div>
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
