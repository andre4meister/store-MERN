import { Modal, Button } from 'antd';
import CartPage from 'pages/CartPage/CartPage';
import { FC, memo } from 'react';
// import styles from '../../pages/CartPage/CartPage.module.scss'

interface CreateReviewModalProps {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreateReviewModal: FC<CreateReviewModalProps> = ({ isModalVisible, setIsModalVisible }) => {
  return (
    <Modal
      title="Edit your order"
      open={isModalVisible}
      width="80%"
      onCancel={() => setIsModalVisible(false)}
      footer={[
        <Button key="cancel" onClick={() => setIsModalVisible(false)}>
          Cancel
        </Button>,
        <Button key="send" type="primary" onClick={() => setIsModalVisible(false)}>
          Submit
        </Button>,
      ]}
    >
      <CartPage />
    </Modal>
  );
};

export default memo(CreateReviewModal);
