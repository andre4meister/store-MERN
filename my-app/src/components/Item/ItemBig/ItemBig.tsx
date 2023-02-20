import { ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { SelectActionProps } from 'components/ActionsComponents/Favourite/SelectAction';
import ItemAveragePoint from 'components/Item/ItemAveragePoint/ItemAveragePoint';
import { FC, memo, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ItemType } from 'store/item/item-types';
import { ShoppingCartItem } from 'store/order/order-types';
import { FetchCartItem, ChangeUserCartAndWishItemsType, RoleEnum } from 'store/user/user-types';
import styles from './ItemBig.module.scss';

interface ChangeLikedStatusProps {
  isItemInLikedArray: boolean | undefined;
  changeItemLikedStatus: () => void;
}

interface BigItemProps {
  ActionComponent: React.ComponentType<SelectActionProps | ChangeLikedStatusProps>;
  item: ItemType;
  userId: string;
  userRole: RoleEnum;
  userCart: ShoppingCartItem[];
  isSelected: boolean;
  changeItemSelectedStatus: (itemId: string) => void;
  onAddItemToCart: (data: FetchCartItem) => void;
  onDeleteItemFromLiked: (data: ChangeUserCartAndWishItemsType) => void;
}

const BigItem: FC<BigItemProps> = ({
  item,
  userId,
  userCart,
  userRole,
  isSelected,
  ActionComponent,
  changeItemSelectedStatus,
  onAddItemToCart,
  onDeleteItemFromLiked,
}) => {
  const {
    _id: itemId,
    category,
    description,
    isAvailable,
    name,
    photos,
    price,
    subCategory,
    brand,
    discountPrice,
    model,
    reviews,
  } = item;

  const [isActive, setIsActive] = useState(false);

  const isItemInCart = useMemo(() => {
    if (userCart) {
      return userCart.find((item) => item.item._id === itemId) && userRole !== 'anonim';
    }
    return false;
  }, [itemId, userCart]);

  return (
    <li
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      className={classNames(styles.itemBig, !isAvailable && styles.itemBigUnavailable, isActive && styles.itemActive)}
      key={itemId}
    >
      <div className={styles.container}>
        <div className={styles.actions}>
          <ActionComponent
            isSelected={isSelected}
            changeItemSelectedStatus={changeItemSelectedStatus}
            itemId={itemId}
          />
        </div>
        <Link to={`/item/${itemId}/main`} className={styles.itemPicture}>
          <img src={photos[0]} alt={name} />
        </Link>
        <Link to={`/item/${itemId}/main`} className={styles.itemName}>
          <span>{name}</span>
        </Link>
        <div className={styles.ratings}>
          <ItemAveragePoint reviews={reviews} itemId={itemId} />
        </div>
        <div className={styles.priceBlock}>
          <div className={styles.price}>
            {discountPrice ? (
              <>
                <div className={styles.oldPrice}>{price}&nbsp;$</div>
                <div className={classNames(styles.hotPrice, styles.defaultPrice)}>{discountPrice}&nbsp;$</div>
              </>
            ) : (
              <div className={classNames(styles.defaultPrice)}>{price}&nbsp;$</div>
            )}
          </div>
          {isItemInCart ? (
            <Link to="/cart" className={styles.addToCartButton}>
              <ShoppingOutlined className={styles.cartIcon} />
            </Link>
          ) : (
            <button className={styles.addToCartButton} onClick={() => onAddItemToCart({ itemId, userId, quantity: 1 })}>
              <ShoppingCartOutlined className={styles.cartIcon} />
            </button>
          )}
        </div>
        <div className={styles.isAvailable}>
          <span className={isAvailable ? styles.available : styles.notAvailable}>
            {isAvailable ? 'Available' : 'Out of stock'}
          </span>
        </div>
      </div>
      <div className={styles.additionalInfo}>
        <div className={styles.characteristics}>
          <p>
            Экран (6.1", OLED (Super Retina XDR), 2532x1170) / Apple A14 Bionic / двойная основная камера: 12 Мп + 12
            Мп, фронтальная камера: 12 Мп / 128 ГБ встроенной памяти / 3G / LTE / 5G / GPS / Nano-SIM, eSIM / iOS 14
          </p>
        </div>
      </div>
    </li>
  );
};

export default memo(BigItem);
