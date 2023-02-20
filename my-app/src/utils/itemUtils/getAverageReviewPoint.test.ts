import { UserType } from 'store/user/user-types';
import { getAverageReviewPoint } from './getAverageReviewPoint';

describe('function getAverageReviewPoint should work correctly', () => {
  test('should work with empty array', () => {
    expect(getAverageReviewPoint([])).toBe(0);
  });

  test('should work with one value array', () => {
    expect(
      getAverageReviewPoint([
        { author: {} as UserType, point: 5, text: 'good', _id: 'ogdfg645', photos: [], createdAt: '22.03.2022' },
      ]),
    ).toBe(5);
  });

  test('should work with unnormally big point returning max point 5', () => {
    expect(
      getAverageReviewPoint([
        { author: {} as UserType, point: 10, text: 'good', _id: 'ogdfg645', photos: [], createdAt: '22.03.2022' },
      ]),
    ).toBe(5);
  });

  test('should correctly calculate average point', () => {
    expect(
      getAverageReviewPoint([
        { author: {} as UserType, point: 5, text: 'good', _id: 'ogdfg645', photos: [], createdAt: '22.03.2022' },
        { author: {} as UserType, point: 1, text: 'good', _id: 'ogdfg65352545', photos: [], createdAt: '22.03.2022' },
        { author: {} as UserType, point: 3, text: 'good', _id: 'ogdfgdfdf645', photos: [], createdAt: '22.03.2022' },
      ]),
    ).toBe(3);
  });
});
