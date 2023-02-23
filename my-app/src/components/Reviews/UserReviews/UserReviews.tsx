import ReviewsList from 'components/Reviews/ReviewsList/ReviewsList';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { memo, useEffect } from 'react';
import { selectUserData, selectUserReviews } from 'store/user/user-selectors';
import { fetchDeleteUserReview, fetchReviewsByUserId } from 'store/user/user-thunks';
import styles from './UserReviews.module.scss';

const UserReviews = () => {
  const dispatch = useAppDispatch();
  const userReviews = useAppSelector(selectUserReviews);
  const { _id: userId } = useAppSelector(selectUserData);

  const onDeleteReview = (reviewId: string) => {
    dispatch(fetchDeleteUserReview({ reviewId }));
  };

  useEffect(() => {
    dispatch(fetchReviewsByUserId({ userId }));
  }, [dispatch, userId]);

  return (
    <div className={styles.myReviews}>
      <h1>My reviews</h1>
      <div className={styles.container}>
        <ReviewsList reviews={userReviews || []} onDeleteReview={onDeleteReview} />
      </div>
    </div>
  );
};

export default memo(UserReviews);
