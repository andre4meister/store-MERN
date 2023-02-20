import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { Image } from 'antd';
import { useMemo, useReducer, useState } from 'react';
import styles from './ItemReviewsPage.module.scss';
import { fetchItemById, fetchLeaveReview } from 'store/item/item-thunks';
import CreateReviewModalForm from 'components/Reviews/CreateReviewModalForm/CreateReviewModalForm';
import ReviewsList from 'components/Reviews/ReviewsList/ReviewsList';
import { fetchDeleteUserReview } from 'store/user/user-thunks';

const ItemReviewsPage = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.userReducer);
  const { _id: userId } = useAppSelector((state) => state.userReducer.userData);
  const { _id: itemId, name, reviews, photos } = useAppSelector((state) => state.itemReducer.itemInfo);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const usersPhotos = useMemo(() => {
    const photosArray: string[] = [];
    reviews.forEach((review) => {
      if (review.photos.length > 0) {
        photosArray.push(...review.photos);
      }
    });
    return photosArray;
  }, [reviews]);

  const handleSendReview = (reviewData: { reviewText: string; reviewRating: number }) => {
    dispatch(
      fetchLeaveReview({
        itemId,
        body: {
          author: userId,
          point: reviewData.reviewRating,
          text: reviewData.reviewText,
          photos: [],
        },
      }),
    ).then(() => {
      setIsModalVisible(false);
    });
  };

  const onDeleteReview = async (reviewId: string) => {
    dispatch(fetchDeleteUserReview({ reviewId }));
    dispatch(fetchItemById({ id: itemId }));
  };

  return (
    <div className={styles.reviewPage}>
      <CreateReviewModalForm
        handleSendReview={handleSendReview}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
      <div className={styles.container}>
        <div className={styles.reviewsBlock}>
          <div className={styles.reviewsPhotos}>
            <h3>Users photos</h3>
            <Image.PreviewGroup>
              <ul className={styles.usersPhotos}>
                {usersPhotos.map((photo) => {
                  return (
                    <Image
                      height={140}
                      width={120}
                      src={photo}
                      className={styles.userPhotosItem}
                      key={'userPhotos' + photo}
                    />
                  );
                })}
              </ul>
            </Image.PreviewGroup>
          </div>
          <div className={styles.leaveReview}>
            <h2>Leave your review on the item</h2>
            <Button
              type="primary"
              size="large"
              className={styles.leaveReviewButton}
              onClick={() => setIsModalVisible(true)}
            >
              Leave a review
            </Button>
          </div>
          {/* // WIP make filter for reviews
          <div className={styles.filters}>Filters</div> */}
          <ReviewsList itemId={itemId} reviews={reviews} onDeleteReview={onDeleteReview} />
        </div>
        <div className={styles.shortItemInfo}>
          <div className={styles.info}>
            <div className={styles.photoAndName}>
              <div className={styles.photoContainer}>
                <img src={photos[0] || ''} alt={name} />
              </div>
              <div className={styles.name}>{name}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemReviewsPage;
