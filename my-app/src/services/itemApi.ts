import { ItemType } from 'store/item/item-types';
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

  static async getItems(filters: any) {
    // WIP make util for formating filters to ?key=value&  keyform
    try {
      const response = await axiosInstance.get<ItemType[]>('items' + filters ? filters : '');
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
