import { CategoryType, SubCategoryType } from 'store/category/category-types';
import axiosInstance from './axios';

export class DashboardApi {
  static async getCategory(id?: string) {
    try {
      const response = await axiosInstance.get<CategoryType>(`category${id ? `/${id}` : ''}`);
      return response;
    } catch (e) {
      return e;
    }
  }

  static async getSubCategory(id?: string) {
    try {
      const response = await axiosInstance.get<SubCategoryType>(`subCategory${id ? `/${id}` : ''}`);
      return response;
    } catch (e) {
      return e;
    }
  }
}
