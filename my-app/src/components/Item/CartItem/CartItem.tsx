import { EllipsisOutlined } from '@ant-design/icons';
import { Dropdown, Button } from 'antd';
import classNames from 'classnames';
import { ChangeEvent, FC, memo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartItem } from 'store/order/order-types';
import { ChangeUserCartAndWishItemsType, FetchCartItem } from 'store/user/user-types';
import styles from './CartItem.module.scss';

interface CartItemProps {
  cartItem: ShoppingCartItem;
  userId: string;
  onAddItemToCart: (data: FetchCartItem) => void;
  onDeleteItemFromCart: (data: FetchCartItem) => void;
  onAddItemtoLikedItems: (data: ChangeUserCartAndWishItemsType) => void;
}
const CartItem: FC<CartItemProps> = ({
  cartItem,
  userId,
  onAddItemtoLikedItems,
  onDeleteItemFromCart,
  onAddItemToCart,
}) => {
  const { _id: itemId, price, discountPrice, name, photos } = cartItem.item;

  const inputRef = useRef<HTMLInputElement>(null);

  const onCounterChange = (e: ChangeEvent<HTMLInputElement>) => {
    onAddItemToCart({ itemId, userId, quantity: Number(e.currentTarget.value) });
  };
  //   const onAddButtonClick = (e: any) => {
  //     onAddItemToCart({itemId, userId, quantity: Number(e.currentTarget.value)})
  //   }

  return (
    <li className={styles.item} key={itemId}>
      <div className={styles.itemBody}>
        <Link to={`/item/${itemId}/main`}>
          <img src={photos[0] || ''} alt={name} />
        </Link>
        <div className={styles.name}>
          <Link to={`/item/${itemId}/main`}>{name}</Link>
        </div>
        <div className={styles.menu}>
          <Dropdown
            menu={{
              items: [
                {
                  label: (
                    <Button
                      type="ghost"
                      onClick={() =>
                        onDeleteItemFromCart({ userId, itemId: itemId, quantity: Number(inputRef.current?.value) || 0 })
                      }
                    >
                      Delete from cart
                    </Button>
                  ),
                  key: 0,
                },
                {
                  label: (
                    <Button type="ghost" onClick={() => onAddItemtoLikedItems({ userId, itemId: itemId })}>
                      Add to wishlist
                    </Button>
                  ),
                  key: 1,
                },
              ],
            }}
            trigger={['hover']}
          >
            <EllipsisOutlined className={styles.menuIcon} />
          </Dropdown>
        </div>
      </div>
      <div className={styles.itemOptions}>
        <div className={styles.counter}>
          <Button
            size="large"
            className={styles.counterButton}
            disabled={cartItem.quantity <= 1}
            onClick={(e: any) =>
              onAddItemToCart({ itemId, userId, quantity: Number(inputRef.current?.value) - 1 || 0 })
            }
          >
            -
          </Button>
          <input className={styles.input} value={cartItem.quantity} ref={inputRef} onChange={onCounterChange} />
          <Button
            size="large"
            className={styles.counterButton}
            onClick={(e: any) =>
              onAddItemToCart({ itemId, userId, quantity: Number(inputRef.current?.value) + 1 || 0 })
            }
          >
            +
          </Button>
        </div>
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
      </div>
    </li>
  );
};

export default memo(CartItem);
