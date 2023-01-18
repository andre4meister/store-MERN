import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './ItemPageNav.module.scss';

export interface ItemNavigationType {
  name: string;
  link: string;
}

export const navArray: ItemNavigationType[] = [
  { name: 'GeneralInfo', link: '' },
  { name: 'Characteristics', link: 'characteristics' },
  { name: 'Reviews', link: 'reviews' },
  { name: 'Questions', link: '/questions' },
  { name: 'Photos', link: '/photos' },
];

const NavItem: FC<ItemNavigationType> = ({ link, name }) => {
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
      {navArray.map((item) => (
        <NavItem link={item.link} name={item.name} key={item.name} />
      ))}
    </ul>
  );
};

export default ItemPageNav;
