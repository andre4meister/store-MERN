import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { FC, memo } from 'react';
import styles from './AddtoCartAction.module.scss';

export interface AddToLikedActionProps {
  isItemInLikedArray: boolean | undefined;
  changeItemLikedStatus: () => void;
}

const AddToLikedAction: FC<AddToLikedActionProps> = ({ isItemInLikedArray, changeItemLikedStatus }) => {
  return (
    <div className={styles.wishItemContainer} onClick={changeItemLikedStatus}>
      {isItemInLikedArray ? <HeartFilled className={styles.wishIcon} /> : <HeartOutlined className={styles.wishIcon} />}
    </div>
  );
};

export default memo(AddToLikedAction);
