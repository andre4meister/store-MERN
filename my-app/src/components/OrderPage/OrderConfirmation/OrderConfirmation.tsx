import { Card, Descriptions, Badge, Button } from 'antd';
import OrderItem from 'components/Item/OrderItem/OrderItem';
import { useAppDispatch } from 'hooks/redux';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { setOrder, setOrderStatus } from 'store/order/order';
import { OrderStatus, OrderType } from 'store/order/order-types';
import { getOrderStatusBadge, getPaymentStatusBadge } from 'utils/orderUtils/getOrderAndPaymentStatus';
import styles from './OrderConfirmation.module.scss';

interface OrderProps {
  order: OrderType;
  orderStatus: OrderStatus;
}

const OrderConfirmation: React.FC<OrderProps> = ({ order, orderStatus }) => {
  const { _id, paymentStatus, items, price, shipmentMethod, delivery, recipientInfo } = order;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (link: string) => {
    navigate(link, { replace: true });
    dispatch(setOrder({} as OrderType));
    dispatch(setOrderStatus('' as OrderStatus));
  };

  return (
    <>
      <Card title={`Order ${_id}`} className={styles.card}>
        <Descriptions bordered>
          <Descriptions.Item label="Order Status" span={3}>
            <Badge status={getOrderStatusBadge(orderStatus)} text={orderStatus} />
          </Descriptions.Item>
          <Descriptions.Item label="Payment Status" span={3}>
            <Badge status={getPaymentStatusBadge(paymentStatus)} text={paymentStatus} />
          </Descriptions.Item>
          <Descriptions.Item label="Items" span={3}>
            {items.map(({ item, quantity }) => (
              <OrderItem item={item} quantity={quantity} key={item._id} />
            ))}
          </Descriptions.Item>
          <Descriptions.Item label="Total Price" span={3}>
            {price}&nbsp;$
          </Descriptions.Item>
          <Descriptions.Item label="Shipment Method" span={3}>
            {shipmentMethod}
          </Descriptions.Item>
          <Descriptions.Item label="Delivery" span={3}>
            {delivery.country}, {delivery.city}, {delivery.postMethod}, Department {delivery.chosenDepartment}
          </Descriptions.Item>
          <Descriptions.Item label="Recipient Info" span={3}>
            {recipientInfo.name} {recipientInfo.surname} ({recipientInfo.email}, {recipientInfo.phone})
          </Descriptions.Item>
        </Descriptions>
        <div className={styles.buttonsContainer}>
          <Button type="link" onClick={() => handleSubmit('/settings/orders')}>
            Go to my orders
          </Button>
          <Button type="primary" onClick={() => handleSubmit('/')}>
            Go shopping more
          </Button>
        </div>
      </Card>
    </>
  );
};

export default memo(OrderConfirmation);
