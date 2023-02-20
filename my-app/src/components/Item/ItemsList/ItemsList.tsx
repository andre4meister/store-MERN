import classNames from 'classnames';
import ItemSmall from 'components/Item/ItemSmall/ItemSmall';
import { FC } from 'react';
import { ItemType } from 'store/item/item-types';
import styles from './ItemsList.module.scss';

export interface ItemsListProps {
  title: string;
  items: ItemType[];
  oneLine?: boolean;
}

const ItemsList: FC<ItemsListProps> = ({ items, title, oneLine = true }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <ul className={classNames(styles.itemsListContainer, oneLine ? '' : styles.multiLine)}>
        {items.map((item) => (
          <ItemSmall item={item} key={item._id} />
        ))}
      </ul>
    </div>
  );
};

export default ItemsList;
