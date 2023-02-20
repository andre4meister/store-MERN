import { Badge, Typography } from 'antd';
import classNames from 'classnames';
import { FC, memo } from 'react';
import { OrderType } from 'store/order/order-types';
import { getOrderStatusBadge } from 'utils/orderUtils/getOrderAndPaymentStatus';
import styles from './OrderPanelHeader.module.scss';

interface OrderPanelHeaderProps {
  order: OrderType;
}
const OrderPanelHeader: FC<OrderPanelHeaderProps> = ({ order }) => {
  const { Text } = Typography;
  return (
    <li className={styles.order}>
      <div className={styles.orderPanelHeader}>
        <div className={classNames(styles.columnHeaderInfo, styles.status)}>
          <Text type="secondary">From {order.createdAt}</Text>
          <Text strong>
            <Badge status={getOrderStatusBadge(order.orderStatus)} text={order.orderStatus} />
          </Text>
        </div>
        <div className={classNames(styles.columnHeaderInfo, styles.price)}>
          <Text type="secondary">Amount:</Text>
          <Text strong>{order.price}&nbsp;$</Text>
        </div>
        <div className={styles.orderItemsPhotos}>
          {order.items.map(({ item }) => (
            <div className={styles.imageContainer} key={item._id}>
              <img src={item.photos[0] || ''} alt={item.name} />
            </div>
          ))}
        </div>
      </div>
    </li>
  );
};

export default memo(OrderPanelHeader);
