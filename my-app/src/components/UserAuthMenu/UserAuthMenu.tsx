import cn from 'classnames';
import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './UserAuthMenu.module.scss';

interface UserAuthMenuProps {
  isAuth: boolean;
  firstName: string;
  userName: string;
  email: string;
}

const UserAuthMenu: FC<UserAuthMenuProps> = ({ email, firstName, userName, isAuth }) => {
  return (
    <li className={styles.avatar}>
      {isAuth ? (
        <NavLink
          to="/settings/user-info"
          className={({ isActive }) => cn(styles.profileNavigation, isActive && styles.activeProfileNavigation)}
        >
          <div className={styles.userMenuItem__icon}>{firstName ? firstName.charAt(0) : ''}</div>
          <div className={styles.userMenuItem__name}>
            <div className={styles.name__name}>{userName}</div>
            <div className={styles.name__email}>{email}</div>
          </div>
        </NavLink>
      ) : (
        <NavLink
          to="/login"
          className={({ isActive }) => cn(styles.profileNavigation, isActive && styles.activeProfileNavigation)}
        >
          <div className={styles.userMenuItem__name}>You are not logged in, login</div>
        </NavLink>
      )}
    </li>
  );
};

export default memo(UserAuthMenu);
