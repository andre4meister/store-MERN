import { UserOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Dropdown, Button, Image } from 'antd';
import ItemAveragePoint from 'components/Item/ItemAveragePoint/ItemAveragePoint';
import { useAppSelector } from 'hooks/redux';
import { FC, memo } from 'react';
import { ReviewType } from 'store/item/item-types';
import styles from './ReviewsList.module.scss';

interface ReviewsListProps {
  itemId?: string;
  reviews: ReviewType[];
  onDeleteReview: (reviewId: string) => void;
}

const ReviewsList: FC<ReviewsListProps> = ({ reviews, itemId, onDeleteReview }) => {
  const { _id: userId, role } = useAppSelector((state) => state.userReducer.userData);

  return (
    <ul className={styles.reviewsList}>
      {reviews.map(({ point, text, _id: reviewId, photos: reviewPhotos, author }) => {
        return (
          <li className={styles.review} key={reviewId}>
            <div className={styles.reviewItemContainer}>
              <div className={styles.reviewHeaderContainer}>
                <UserOutlined />
                <div className={styles.headerInfo}>
                  <div>{author.userName}</div>
                  <div>{'created at date'}</div>
                  <div className={styles.menu}>
                    <Dropdown
                      menu={{
                        items: [
                          {
                            label: <Button type="ghost">Report</Button>,
                            key: 0,
                          },
                          userId === author._id
                            ? {
                                label: (
                                  <Button type="ghost" onClick={() => onDeleteReview(reviewId)}>
                                    Delete
                                  </Button>
                                ),
                                key: 1,
                              }
                            : null,
                        ],
                      }}
                      trigger={['hover']}
                    >
                      <EllipsisOutlined className={styles.menuIcon} />
                    </Dropdown>
                  </div>
                </div>
              </div>
              <div className={styles.reviewBody}>
                <ItemAveragePoint itemId={itemId} reviews={reviews} point={point} />
                <p>{text}</p>
              </div>
              {reviewPhotos.length > 0 ? (
                <div className={styles.reviewPhotos}>
                  <Image.PreviewGroup>
                    <ul className={styles.reviewPhotoList}>
                      {reviewPhotos.map((photo) => {
                        return (
                          <Image
                            height={80}
                            src={photo}
                            className={styles.userPhotosItem}
                            key={'review photo:' + photo}
                          />
                        );
                      })}
                    </ul>
                  </Image.PreviewGroup>
                </div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default memo(ReviewsList);
