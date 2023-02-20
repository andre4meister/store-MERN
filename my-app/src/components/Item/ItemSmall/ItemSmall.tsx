import classNames from 'classnames';
import AddtoCartAction from 'components/ActionsComponents/Catalog/AddtoCartAction';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { FC, memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { addNotification } from 'store/alert/alert';
import { ItemType } from 'store/item/item-types';
import { fetchAddItemToLiked, fetchDeleteItemFromLiked } from 'store/user/user-thunks';
import { ChangeUserCartAndWishItemsType } from 'store/user/user-types';
import styles from './ItemSmall.module.scss';

export interface ItemProps {
  item: ItemType;
}

const ItemSmall: FC<ItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const { _id: itemId, name, photos, price, discountPrice } = item;
  const { likedItems, role, _id: userId } = useAppSelector((state) => state.userReducer.userData);

  const isItemInLikedArray = useMemo(() => {
    if (likedItems) {
      return likedItems.find((item) => item._id === itemId) && role !== 'anonim';
    }
    return false;
  }, [item, itemId, likedItems]);

  const changeItemLikedStatus = () => {
    if (!userId) {
      dispatch(addNotification({ message: 'You should login to add items to your favourite list', type: 'info' }));
      return;
    }
    const requestBody: ChangeUserCartAndWishItemsType = {
      itemId: itemId,
      userId,
    };
    if (isItemInLikedArray) {
      dispatch(fetchDeleteItemFromLiked(requestBody));
    } else {
      dispatch(fetchAddItemToLiked(requestBody));
    }
  };

  return (
    <li className={styles.itemContainer} key={itemId}>
      <div className={styles.wishItemContainer}>
        <AddtoCartAction changeItemLikedStatus={changeItemLikedStatus} isItemInLikedArray={isItemInLikedArray} />
      </div>
      <Link to={`/item/${itemId}/main`} className={styles.linkContainer}>
        <div>
          <img src={photos[0] ? photos[0] : ''} alt={name} />
        </div>
        <p>{name}</p>
      </Link>
      <span className={styles.discountPrice}>{discountPrice ? discountPrice + ' $' : null}</span>
      <span className={classNames(styles.price, discountPrice && styles.hotPrice)}>{price + '$'}</span>
    </li>
  );
};

export default memo(ItemSmall);
