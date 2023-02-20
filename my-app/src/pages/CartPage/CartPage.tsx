import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { Link, useNavigate } from 'react-router-dom';
import { countCartItems } from 'utils/userUtils/countItems';
import styles from './CartPage.module.scss';
import { fetchAddItemToLiked, fetchAddItemToUserCart, fetchDeleteItemFromUserCart } from 'store/user/user-thunks';
import { ChangeUserCartAndWishItemsType, FetchCartItem } from 'store/user/user-types';
import CartItem from 'components/Item/CartItem/CartItem';
import { Button } from 'antd';
import { getTotalCountSum } from 'utils/userUtils/getTotalOrderSum';
import { DeleteOutlined } from '@ant-design/icons';
import UserShouldLogin from 'components/UserShouldLogin/UserShouldLogin';

const CartPage = () => {
  const dispatch = useAppDispatch();

  const { _id: userId, cart } = useAppSelector((state) => state.userReducer.userData);
  const { isAuth } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const onDeleteItemFromCart = (data: FetchCartItem) => {
    dispatch(fetchDeleteItemFromUserCart(data));
  };

  const onAddItemToCart = (data: FetchCartItem) => {
    dispatch(fetchAddItemToUserCart(data));
  };

  const onAddItemtoLikedItems = (data: ChangeUserCartAndWishItemsType) => {
    dispatch(fetchAddItemToLiked(data));
  };

  if (!isAuth) {
    return <UserShouldLogin pageName="Cart" />;
  }

  return (
    <div className={styles.cartPage}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>Cart</h1>
          {/* WIP delete all items from cart */}
          <DeleteOutlined onClick={() => console.log('delete all items from cart')} />
        </div>
        {!countCartItems(cart) ? (
          <>
            <div className={styles.imageContainer}>
              <img
                className={styles.empryCart}
                src="https://xl-static.rozetka.com.ua/assets/img/design/modal-cart-dummy.svg"
                alt="Empty cart"
              />
            </div>
            <h1 className={styles.loginWarning}>
              Your cart is empty, but you can easily <Link to="/"> fix it</Link>
            </h1>
          </>
        ) : (
          <>
            <ul className={styles.cartItems}>
              {cart.map((item) => (
                <CartItem
                  key={item.item._id}
                  cartItem={item}
                  userId={userId}
                  onAddItemToCart={onAddItemToCart}
                  onAddItemtoLikedItems={onAddItemtoLikedItems}
                  onDeleteItemFromCart={onDeleteItemFromCart}
                />
              ))}
            </ul>

            <div className={styles.totalCountContainer}>
              <div className={styles.buyMoreButton}>
                <Link to="/">Search other goods</Link>
              </div>
              <div className={styles.totalCount}>
                <div className={styles.totalSum}>
                  {/* <p>Total:</p> */}
                  <span>{getTotalCountSum(cart)}&nbsp;$</span>
                </div>
                <Button type="primary" size="large" onClick={() => navigate('/order')}>
                  Place an order
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
