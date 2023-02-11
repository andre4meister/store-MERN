import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { FC, useEffect } from 'react';
import { NotificationsType, toggleAlertIsOpen, deleteNotification } from '../../store/alert/alert';
import styles from './Alert.module.scss';
import Notification from './Notification';

interface AlertType {
  notifications: NotificationsType[];
}
const Notifications: FC<AlertType> = ({ notifications }) => {
  return (
    <div className={styles.notifications}>
      {notifications.map((notification) => (
        <Notification key={notification.message} notification={notification} deleteNotification={deleteNotification} />
      ))}
    </div>
  );
};

const GlobalAlert = () => {
  const dispatch = useAppDispatch();
  const { alertIsOpen, notifications } = useAppSelector((state) => state.alertReducer);

  useEffect(() => {
    notifications.length > 0 ? dispatch(toggleAlertIsOpen(true)) : dispatch(toggleAlertIsOpen(false));
  }, [alertIsOpen, dispatch, notifications.length]);

  if (!alertIsOpen) return null;

  return (
    <div className={styles.container}>
      <Notifications notifications={notifications} />
    </div>
  );
};

export default GlobalAlert;
