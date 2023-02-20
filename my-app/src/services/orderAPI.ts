import { ObjectWithStringValues } from 'store/commonTypes';
import { CreateOrderFormType, OrderType } from 'store/order/order-types';
import { createQueriesForFetch } from 'utils/commonUtils/createQueriesForFetch';
import axiosInstance from './axios';

export class OrderApi {
  static async getOrderById(id: string) {
    try {
      const response = await axiosInstance.get<OrderType>(`orders/${id}`);
      return response;
    } catch (e) {
      return e;
    }
  }

  static async getOrders(filters?: ObjectWithStringValues) {
    try {
      const response = await axiosInstance.get<OrderType[]>(
        `orders${filters ? createQueriesForFetch(filters || {}) : ''}`,
      );
      return response;
    } catch (e) {
      return e;
    }
  }

  static async createOrder(body: CreateOrderFormType) {
    try {
      const response = await axiosInstance.post<OrderType>('orders', body);
      return response;
    } catch (e) {
      return e;
    }
  }

  static async updateOrder(body: Omit<Partial<OrderType>, '_id'>) {
    try {
      const response = await axiosInstance.put<OrderType>('orders', body);
      return response;
    } catch (e) {
      return e;
    }
  }

  static async deleteOrder(id: string) {
    try {
      const response = await axiosInstance.delete<OrderType>(`Orders/${id}`);
      return response;
    } catch (e) {
      return e;
    }
  }
}
