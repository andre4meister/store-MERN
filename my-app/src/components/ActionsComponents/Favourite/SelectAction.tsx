import { FC, memo } from 'react';
import styles from './SelectAction.module.scss';

export interface SelectActionProps {
  itemId: string;
  isSelected: boolean;
  changeItemSelectedStatus: (itemId: string) => void;
}

const SelectAction: FC<SelectActionProps> = ({ changeItemSelectedStatus, isSelected, itemId }) => {
  return (
    <div className={styles.choose}>
      <input type="checkbox" checked={isSelected} onChange={() => changeItemSelectedStatus(itemId)} />
    </div>
  );
};

export default memo(SelectAction);
