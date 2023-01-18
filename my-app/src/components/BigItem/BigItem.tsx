import { ItemProps } from 'components/ItemSmall/ItemSmall';
import { FC } from 'react';
import styles from './BigItem.module.scss';

const BigItem: FC<ItemProps> = ({ item }) => {
  const { _id, category, description, isAvailable, name, photos, price, subCategory, brand, discountPrice, model } =
    item;
  return (
    <li className={styles.itemContainer} key={_id}>
      name
    </li>
  );
};

export default BigItem;
