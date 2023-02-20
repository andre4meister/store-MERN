import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { Suspense, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'antd';
import { fetchItems } from 'store/dashboard/dashboard-thunks';
import styles from './ItemPage.module.scss';
import { fetchItemById } from 'store/item/item-thunks';
import classNames from 'classnames';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Loader from 'components/Loader/Loader';
import Slider from 'components/Slider/Slider';
import { fetchAddItemToUserCart } from 'store/user/user-thunks';
import { addNotification } from 'store/alert/alert';
import { Link } from 'react-router-dom';

const ItemsList = React.lazy(() => import('../../components/Item/ItemsList/ItemsList'));

const ItemPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { likedItems } = useAppSelector((state) => state.dashboardReducer);
  const { _id: userId, cart, role } = useAppSelector((state) => state.userReducer.userData);
  const { itemInfo } = useAppSelector((state) => state.itemReducer);

  const { _id: itemId, description, isAvailable, photos, price, discountPrice } = itemInfo;

  // WIP decompose this useMemo because it uses in different places
  const isItemInCart = useMemo(() => {
    if (cart) {
      return cart.find((item) => item.item._id === itemId) && role !== 'anonim';
    }
    return false;
  }, [itemId, cart]);

  const onAddItemToCart = () => {
    if (role === 'anonim' || role === undefined) {
      dispatch(addNotification({ message: 'You should login to add items to a cart', type: 'info' }));
      return;
    }
    if (!isItemInCart) {
      dispatch(fetchAddItemToUserCart({ userId, itemId, quantity: 1 }));
    }
  };

  useEffect(() => {
    if (!itemInfo._id || id !== itemInfo._id) dispatch(fetchItemById({ id: id || '' }));
  }, [itemInfo._id, id]);

  if (!itemId) {
    return <Loader />;
  }

  return (
    <>
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
              <Button className={styles.button} size="large" type="default" onClick={onAddItemToCart}>
                {isItemInCart ? (
                  <div className={styles.cartSpan}>
                    <ShoppingCartOutlined className={styles.inCartIcon} />
                    <Link to="/cart">In cart</Link>
                  </div>
                ) : (
                  <span className={styles.cartSpan}> Add to cart</span>
                )}
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
    </>
  );
};

export default ItemPage;
