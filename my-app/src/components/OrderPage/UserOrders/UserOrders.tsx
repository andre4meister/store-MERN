import { Collapse } from 'antd';
import { CustomPanel } from 'components/Dropdown/DropdownPanel';
import OrderPanelHeader from 'components/Dropdown/OrderPanelHeader/OrderPanelHeader';
import OrderItem from 'components/Item/OrderItem/OrderItem';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useState, useEffect, memo } from 'react';
import { fetchOrdersByUserId } from 'store/order/order-thunks';
import { OrderType } from 'store/order/order-types';
import {} from 'store/user/user-thunks';
import styles from './UserOrders.module.scss';

const UserOrders = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.userReducer);
  const { _id: userId } = useAppSelector((state) => state.userReducer.userData);
  const [userOrders, setUserOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    dispatch(fetchOrdersByUserId({ userId })).then((data) => setUserOrders(data.payload as OrderType[]));
  }, [isAuth, userId]);

  if (isAuth === undefined) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={styles.myReviews}>
      <h1>My orders</h1>
      <div className={styles.container}>
        <Collapse className="order-dropdown" bordered={false}>
          {userOrders.map((order) => (
            <CustomPanel header={<OrderPanelHeader order={order} />} key={order._id}>
              <div className={styles.orderdetails}>
                <div className={styles.infoBlock}>
                  <div className={styles.deliveryinfo}>
                    <span>Delivery Info:</span>
                    <p>{`${order.delivery.country}, ${order.delivery.city}`}</p>
                    <p>{`${order.delivery.postMethod}, ${order.delivery.chosenDepartment}`}</p>
                  </div>
                  <div className={styles.recipientInfo}>
                    <span>Recipient Info:</span>
                    <p>{`${order.recipientInfo.name} ${order.recipientInfo.surname}`}</p>
                    <p>{`${order.recipientInfo.email}, ${order.recipientInfo.phone}`}</p>
                  </div>
                </div>
                <div className={styles.orderItemsList}>
                  {order.items.map(({ item, quantity }) => (
                    <OrderItem item={item} quantity={quantity} key={item._id} />
                  ))}
                </div>
              </div>
            </CustomPanel>
          ))}
        </Collapse>
      </div>
    </div>
  );
};

export default memo(UserOrders);
