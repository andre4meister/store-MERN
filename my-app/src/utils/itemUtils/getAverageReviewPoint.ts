import { ReviewType } from 'store/item/item-types';

export const getAverageReviewPoint = (reviews: ReviewType[]) => {
  if (reviews.length === 0) return 0;

  const averagePoint = reviews.reduce((prev, cur) => prev + cur.point, 0) / reviews.length;
  return averagePoint >= 5 ? 5 : averagePoint;
};
