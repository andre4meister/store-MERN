import { ObjectWithStringValues } from 'store/commonTypes';
import { FetchLeaveReview, ReviewType } from 'store/item/item-types';
import { createQueriesForFetch } from 'utils/commonUtils/createQueriesForFetch';
import axiosInstance from './axios';

export class ReviewApi {
  static async getReviewById(id: string) {
    try {
      const response = await axiosInstance.get<ReviewType>(`Reviews/${id}`);
      return response;
    } catch (e) {
      return e;
    }
  }

  static async getReviews(filters?: ObjectWithStringValues) {
    try {
      const response = await axiosInstance.get<ReviewType[]>(
        `reviews${filters ? createQueriesForFetch(filters || {}) : ''}`,
      );
      return response;
    } catch (e) {
      return e;
    }
  }

  static async createReview(body: FetchLeaveReview) {
    try {
      const response = await axiosInstance.post<ReviewType>('reviews', body);
      return response;
    } catch (e) {
      return e;
    }
  }

  static async updateReview(body: Omit<Partial<ReviewType>, '_id'>) {
    try {
      const response = await axiosInstance.put<ReviewType>('reviews', body);
      return response;
    } catch (e) {
      return e;
    }
  }

  static async deleteReview(id: string) {
    try {
      const response = await axiosInstance.delete<ReviewType>(`reviews/${id}`);
      return response;
    } catch (e) {
      return e;
    }
  }
}
