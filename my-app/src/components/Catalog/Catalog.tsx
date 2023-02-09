import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories } from 'store/dashboard/dashboard-thunks';
import styles from './Catalog.module.scss';

const Catalog: FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.dashboardReducer.categories);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories({}));
    }
  }, []);

  return (
    <div className={styles.catalogContainer}>
      <ul className={styles.catalog}>
        {categories.map((category) => {
          return (
            <li className={styles.categoryListItem} key={category._id}>
              <div className={styles.categoryTitle}>
                <h1>{category.name}</h1>
              </div>
              <ul className={styles.subCategoriesContainer}>
                {category.subCategories.map((subCategory) => {
                  return (
                    <li className={styles.subCategoryListItem} key={Math.random() * 10000}>
                      <Link to={`/items/${category}/${subCategory}`}>{'subCategory.name'}</Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Catalog;
