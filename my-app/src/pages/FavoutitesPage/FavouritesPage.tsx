import SelectAction, { SelectActionProps } from 'components/ActionsComponents/Favourite/SelectAction';
import { AddToLikedActionProps } from '../../components/ActionsComponents/Catalog/AddtoCartAction';
import ItemBig from 'components/Item/ItemBig/ItemBig';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchAddItemToUserCart, fetchDeleteItemFromLiked } from 'store/user/user-thunks';
import { FetchCartItem, ChangeUserCartAndWishItemsType } from 'store/user/user-types';
import { countLikedItems } from 'utils/userUtils/countItems';
import styles from './FavouritesPage.module.scss';
import { Button } from 'antd';
import { getLikedItemsTotalSum } from 'utils/userUtils/getTotalOrderSum';
import { addNotification } from 'store/alert/alert';
import UserShouldLogin from 'components/UserShouldLogin/UserShouldLogin';

const FavouritesPage = () => {
  const dispatch = useAppDispatch();

  const { _id: userId, likedItems, cart, role } = useAppSelector((state) => state.userReducer.userData);
  const { isAuth } = useAppSelector((state) => state.userReducer);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const navigate = useNavigate();

  const changeItemSelectedStatus = (itemId: string) => {
    setSelectedItems((prev) => {
      const isItemSelected = prev.find((item) => itemId === item) || false;

      if (isItemSelected) {
        return prev.filter((item) => item !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  const getItemSelectedStatus = (itemId: string) => {
    return Boolean(selectedItems.find((item) => item === itemId));
  };

  // WIP change use controller and types to change liked items 1 item or many in 1 time
  const chooseAllItems = () => {
    setSelectedItems((prev) => {
      return [...likedItems.map((item) => item._id)];
    });
  };

  const onAddItemToCart = (data: FetchCartItem) => {
    dispatch(fetchAddItemToUserCart(data));
  };

  const onDelteItemFromLiked = (data: ChangeUserCartAndWishItemsType) => {
    dispatch(fetchDeleteItemFromLiked(data));
  };

  const addAllItemsToCart = async () => {
    try {
      const fetchLikedItemsIdArray = likedItems.map((item) => {
        return dispatch(fetchAddItemToUserCart({ itemId: item._id, userId, quantity: 1 }));
      });
      await Promise.all(fetchLikedItemsIdArray);
      navigate('/cart');
    } catch (error) {
      const errorMessage = error as string;
      dispatch(addNotification({ message: errorMessage, type: 'error' }));
    }
  };

  if (!isAuth) {
    return <UserShouldLogin pageName="Favourite" />;
  }

  return (
    <div className={styles.favouritePage}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>Favourites</h1>
        </div>
        {!countLikedItems(likedItems) ? (
          <>
            <div className={styles.imageContainer}>
              <img
                className={styles.empryFavouriteList}
                src="https://xl-static.rozetka.com.ua/assets/img/design/modal-cart-dummy.svg"
                alt="Empty cart"
              />
            </div>
            <h1 className={styles.loginWarning}>
              Your favourites list is empty, but you can easily <Link to="/"> fix it</Link>
            </h1>
          </>
        ) : (
          <>
            <ul className={styles.likedItems}>
              {likedItems.map((item) => (
                <ItemBig
                  key={item._id}
                  item={item}
                  userCart={cart}
                  userRole={role}
                  userId={userId}
                  isSelected={getItemSelectedStatus(item._id)}
                  ActionComponent={SelectAction as React.ComponentType<SelectActionProps | AddToLikedActionProps>}
                  changeItemSelectedStatus={changeItemSelectedStatus}
                  onAddItemToCart={onAddItemToCart}
                  onDeleteItemFromLiked={onDelteItemFromLiked}
                />
              ))}
            </ul>
            <div className={styles.totalCountContainer}>
              <div className={styles.buyMoreButton}>
                <Link to="/">Search other goods</Link>
              </div>
              <div className={styles.totalCount}>
                <div className={styles.totalSum}>
                  <p>Total:</p>
                  <span>{getLikedItemsTotalSum(likedItems)}&nbsp;$</span>
                </div>
                <Button type="primary" size="large" onClick={addAllItemsToCart}>
                  Buy all items
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FavouritesPage;
