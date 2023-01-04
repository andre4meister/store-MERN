import { Input, Form } from 'antd';
import { FC } from 'react';
import styles from './SettingsForm.module.scss';

interface FormItemProps {
  label: string;
  isEditing: boolean;
  defaultValue: string;
  inputName: string;
}

const FormItem: FC<FormItemProps> = ({ isEditing, defaultValue, label, inputName }) => {
  return (
    <Form.Item className={styles.form__item} name={inputName} label={label}>
      {isEditing ? (
        <Input className={styles.item__value} defaultValue={defaultValue} />
      ) : (
        <div className={styles.item__value}>{defaultValue || '-'}</div>
      )}
    </Form.Item>
  );
};

export default FormItem;
