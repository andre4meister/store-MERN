import { NavLink, Outlet } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import styles from './ItemPage.module.scss';
import ItemPageNav from 'components/Item/ItemPageNav/ItemPageNav';
import { RightOutlined } from '@ant-design/icons';
import Loader from 'components/Loader/Loader';
import ItemAveragePoint from 'components/Item/ItemAveragePoint/ItemAveragePoint';
import { useGetItemInfo } from 'hooks/useGetItemInfo';
import { useEffect } from 'react';
import { fetchItems } from 'store/dashboard/dashboard-thunks';
import { fetchItemById } from 'store/item/item-thunks';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

const ItemPageContainer = () => {
  const dispatch = useAppDispatch();
  const { itemInfo, id } = useGetItemInfo();
  const { _id: itemId, name, reviews } = itemInfo;
  const { likedItems } = useAppSelector((state) => state.dashboardReducer);

  //  WIP Temporary mock for recommende and other items when starting with item page
  useEffect(() => {
    if (likedItems.length === 0) {
      dispatch(fetchItems());
    }
  }, []);

  useEffect(() => {
    // WIP fix many multiple requests and implement abort controller everywhere
    const controller = new AbortController();
    const signal = controller.signal;

    if (!itemInfo._id || id !== itemInfo._id) {
      dispatch(fetchItemById({ id: id || '' }));
    }

    return () => {
      controller.abort();
    };
  }, [itemInfo._id, id]);

  if (!itemId) {
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
            {
              // WIp fix this breadcrumb
              /* <Breadcrumb.Item href="#">{category.name}</Breadcrumb.Item>
            <Breadcrumb.Item href="/#">{subCategory.name}</Breadcrumb.Item> */
            }
            <Breadcrumb.Item href="/#">{name}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={styles.title}>{name}</div>
        <div className={styles.stars}>
          <ItemAveragePoint reviews={reviews} itemId={itemId} />
        </div>
      </div>
      <div className={styles.navigationTabs}>
        <ItemPageNav />
      </div>
      <Outlet />
    </main>
  );
};

export default ItemPageContainer;
