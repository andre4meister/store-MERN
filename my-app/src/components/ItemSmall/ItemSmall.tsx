import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useAppSelector } from 'hooks/redux';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { ItemType } from 'store/item/item-types';
import styles from './ItemSmall.module.scss';

export interface ItemProps {
  item: ItemType;
}

const ItemSmall: FC<ItemProps> = ({ item }) => {
  const { _id, category, description, isAvailable, name, photos, price, subCategory, brand, discountPrice, model } =
    item;
  const { likedItems, role } = useAppSelector((state) => state.userReducer.userData);

  const isItemInLikedArray = () => {
    if (likedItems) {
      return likedItems.find((item) => item._id === _id);
    }
    return false;
  };

  const itemIsLiked = role !== 'anonim' && isItemInLikedArray;
  return (
    <li className={styles.itemContainer} key={_id}>
      <div className={styles.wishItemContainer}>
        {itemIsLiked ? <HeartFilled className={styles.wishIcon} /> : <HeartOutlined className={styles.wishIcon} />}
      </div>
      <NavLink to={`/item/${_id}/`} className={styles.linkContainer}>
        <div>
          <img src={photos[0] ? photos[0] : ''} alt={name} />
        </div>
        <p>{name}</p>
      </NavLink>
      <span className={styles.discountPrice}>{discountPrice ? discountPrice : '54' + ' $'}</span>
      <span className={classNames(styles.price, !discountPrice && styles.hotPrice)}>{price + '$'}</span>
    </li>
  );
};

export default ItemSmall;
