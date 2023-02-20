import { ItemNavigationType, itemNavArray } from 'App';
import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './ItemPageNav.module.scss';

const NavItem: FC<ItemNavigationType> = ({ link, name, Component }) => {
  return (
    <li className={styles.itemNavigation}>
      <NavLink to={link} className={({ isActive }) => classNames(isActive && styles.itemNavigation__active)}>
        {name}
      </NavLink>
    </li>
  );
};

const ItemPageNav = () => {
  return (
    <ul className={styles.containerForNavigation}>
      {itemNavArray.map((item) => (
        <NavItem link={item.link} name={item.name} key={item.name} />
      ))}
    </ul>
  );
};

export default ItemPageNav;
