import { StarFilled } from '@ant-design/icons';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ReviewType } from 'store/item/item-types';
import { getAverageReviewPoint } from 'utils/itemUtils/getAverageReviewPoint';
import styles from './ItemAveragePoint.module.scss';

interface ItemAveragePointProps {
  itemId?: string;
  reviews: ReviewType[];
  point?: number;
}
const ItemAveragePoint: FC<ItemAveragePointProps> = ({ reviews, itemId, point = null }) => {
  const averagePoint = point ? point : getAverageReviewPoint(reviews);
  const starArray = [];
  for (let i = 1; i <= 5; i++) {
    starArray.push(i);
  }

  return (
    <>
      {point ? (
        <div className={styles.starsContainer}>
          {starArray.map((star) => {
            if (star <= Math.round(averagePoint)) {
              return <StarFilled key={star} className={styles.yellow} />;
            } else {
              return <StarFilled key={star} className={styles.gray} />;
            }
          })}
        </div>
      ) : (
        <div className={styles.starsContainer}>
          {starArray.map((star) => {
            if (star <= Math.round(averagePoint)) {
              return <StarFilled key={star} className={styles.yellow} />;
            } else {
              return <StarFilled key={star} className={styles.gray} />;
            }
          })}
          <div>
            <Link to={`/item/${itemId}/reviews`} className={styles.reviewLink}>
              {reviews.length} reviews
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemAveragePoint;
