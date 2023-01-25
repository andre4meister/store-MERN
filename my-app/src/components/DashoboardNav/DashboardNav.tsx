import { useAppSelector } from 'hooks/redux';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { CategoryType } from 'store/category/category-types';
import styles from './DashboardNav.module.scss';

export const DashboardNavItem: FC<CategoryType> = ({ name, icon, _id, ...props }) => {
  const linkFromName: string = name.toLocaleLowerCase().replaceAll(' ', '-');
  return (
    <li className={styles.dashboardNavItem} data-testid="dashbordNavItemLi">
      <NavLink to={linkFromName} data-testid="navlink">
        <img src={icon} alt={name} />
        <p data-testid="name">{name}</p>
      </NavLink>
    </li>
  );
};

const DashboardNav = () => {
  const { categories } = useAppSelector((state) => state.dashboardReducer);

  if (categories.length === 0 || !categories) {
    return null;
  }

  return (
    <ul className={styles.categoriesMenu} data-testid="dashbordNavItemUl">
      {categories.map((category) => (
        <DashboardNavItem {...category} key={category._id} />
      ))}
    </ul>
  );
};

export default DashboardNav;
