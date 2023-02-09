import mongoose from 'mongoose';
import { ItemType } from '../../product-model/item-types';

export default function createSortOptions(sort: string) {
  const sortOptions = {} as mongoose.QueryOptions<ItemType>;
  if (sort) {
    const [order, property] = sort.split('_');
    sortOptions[property] = order === '1' ? 1 : -1;
  }
  return sort;
}
