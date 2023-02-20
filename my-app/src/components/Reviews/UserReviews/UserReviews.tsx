import ReviewsList from 'components/Reviews/ReviewsList/ReviewsList';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { memo, useEffect, useState } from 'react';
import { ReviewType } from 'store/item/item-types';
import { fetchDeleteUserReview, fetchReviewsByUserId } from 'store/user/user-thunks';
import styles from './UserReviews.module.scss';

const UserReviews = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.userReducer);
  const { _id: userId } = useAppSelector((state) => state.userReducer.userData);
  const [userReviews, setUserReviews] = useState<ReviewType[]>([]);

  const [forceRender, setForceRender] = useState(0);

  const onDeleteReview = async (reviewId: string) => {
    await dispatch(fetchDeleteUserReview({ reviewId }));
    setForceRender((prev) => prev + 1);
  };

  useEffect(() => {
    dispatch(fetchReviewsByUserId({ userId })).then((data) => setUserReviews(data.payload as ReviewType[]));
  }, [isAuth, userId, forceRender]);

  return (
    <div className={styles.myReviews}>
      <h1>My reviews</h1>
      <div className={styles.container}>
        <ReviewsList reviews={userReviews} onDeleteReview={onDeleteReview} />
      </div>
    </div>
  );
};

export default memo(UserReviews);
