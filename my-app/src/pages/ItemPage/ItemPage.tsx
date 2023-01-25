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

const ItemPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { likedItems } = useAppSelector((state) => state.dashboardReducer);
  const { appError } = useAppSelector((state) => state.appReducer);
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
