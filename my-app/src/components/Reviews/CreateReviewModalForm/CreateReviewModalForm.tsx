import { Modal, Rate, Button, Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { FC, memo, useState } from 'react';

interface CreateReviewModalProps {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleSendReview: (reviewData: { reviewText: string; reviewRating: number }) => void;
}
const CreateReviewModal: FC<CreateReviewModalProps> = ({ handleSendReview, isModalVisible, setIsModalVisible }) => {
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(0);

  const onHandleSubmit = () => {
    handleSendReview({ reviewRating, reviewText });
    setReviewText('');
    setReviewRating(0);
  };

  return (
    <Modal
      title="Leave a review"
      open={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={[
        <Button key="cancel" onClick={() => setIsModalVisible(false)}>
          Cancel
        </Button>,
        <Button key="send" type="primary" onClick={onHandleSubmit}>
          Send review
        </Button>,
      ]}
    >
      <Form>
        <TextArea
          placeholder="Enter your review text"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <br />
        <br />
        <span>Rating:</span>
        <Rate value={reviewRating} onChange={(value) => setReviewRating(value)} />
      </Form>
    </Modal>
  );
};

export default memo(CreateReviewModal);
