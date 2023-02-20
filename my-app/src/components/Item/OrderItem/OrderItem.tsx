import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { ItemType } from 'store/item/item-types';
import styles from './OrderItem.module.scss';

interface OrderItemProps {
  item: ItemType;
  quantity: number;
}
const OrderItem: FC<OrderItemProps> = ({ item, quantity }) => {
  return (
    <li key={item._id} className={styles.listItem}>
      <div className={styles.wrapper}>
        <Link to={`/item/${item._id}/main`}>
          <figure className={styles.itemFigure}>
            <span>
              <img src={item.photos[0] || ''} alt={item.name} />
            </span>
            <figcaption>{item.name}</figcaption>
          </figure>
        </Link>
        <div className={styles.itemData}>
          <div className={styles.indicator}>
            <div className={styles.indicatorLabel}>Price</div>
            <span>{item.discountPrice || item.price}&nbsp;$</span>
          </div>
          <div className={styles.indicator}>
            <div className={styles.indicatorLabel}>Quantity</div>
            <span>{quantity}</span>
          </div>
          <div className={styles.indicator}>
            <div className={styles.indicatorLabel}>Sum</div>
            <span>{(item.discountPrice || item.price) * quantity}&nbsp;$</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default memo(OrderItem);
