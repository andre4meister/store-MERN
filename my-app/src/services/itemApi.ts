import { ObjectWithStringValues } from 'store/commonTypes';
import { ItemType } from 'store/item/item-types';
import { createQueriesForFetch } from 'utils/commonUtils/createQueriesForFetch';
import axiosInstance from './axios';

export class ItemApi {
  static async getItemById(id: string) {
    try {
      const response = await axiosInstance.get<ItemType>(`items/${id}`);
      return response;
    } catch (e) {
      return e;
    }
  }

  static async getItems(filters?: ObjectWithStringValues) {
    try {
      const response = await axiosInstance.get<ItemType[]>(
        `items${filters ? createQueriesForFetch(filters || {}) : ''}`,
      );
      return response;
    } catch (e) {
      return e;
    }
  }

  static async createItem(body: Omit<ItemType, '_id'>) {
    try {
      const response = await axiosInstance.post<ItemType>('items', body);
      return response;
    } catch (e) {
      return e;
    }
  }

  static async updateItem(body: Omit<Partial<ItemType>, '_id'>) {
    try {
      const response = await axiosInstance.put<ItemType>('items', body);
      return response;
    } catch (e) {
      return e;
    }
  }

  static async deleteItem(id: string) {
    try {
      const response = await axiosInstance.delete<ItemType>(`items/${id}`);
      return response;
    } catch (e) {
      return e;
    }
  }
}
