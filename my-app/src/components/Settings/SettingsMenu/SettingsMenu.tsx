import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from '../../../pages/SettingPage/Settings.module.scss';
import { settingsMenuItems } from 'utils/settings/settingsMenu';

const SettingsMenu = () => {
  return (
    <ul className={styles.menu__ul}>
      {settingsMenuItems.map((menuItem) => {
        return (
          <li className={styles.menuItem} key={menuItem.name + menuItem.url}>
            <NavLink
              to={menuItem.url}
              className={({ isActive }) => cn(styles.profileNavigation, isActive && styles.activeProfileNavigation)}
            >
              <div className={styles.menuItem__icon}>{menuItem.icon}</div>
              <div className={styles.menuItem__name}>{menuItem.name}</div>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default SettingsMenu;
