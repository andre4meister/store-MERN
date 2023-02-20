import { Button, Space } from 'antd';
import styles from './SettingsForm.module.scss';

interface ButtonForFormsType {
  isEditing: boolean;
  switchIsEditing: () => void;
}
const ButtonForForms: React.FC<ButtonForFormsType> = ({ isEditing, switchIsEditing }) => {
  return (
    <div className={styles.container__button}>
      {isEditing ? (
        <Space>
          <Button className={styles.form__button} htmlType="submit" type="primary">
            Save
          </Button>
          <Button className={styles.form__button} onClick={switchIsEditing} type="link" htmlType="reset">
            Cancel
          </Button>
        </Space>
      ) : (
        <Button className={styles.form__button} onClick={switchIsEditing} type="primary">
          Edit
        </Button>
      )}
    </div>
  );
};

export default ButtonForForms;
