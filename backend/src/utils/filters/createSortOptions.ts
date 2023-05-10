import mongoose from 'mongoose';
import { ItemType } from '../../item-model/item-types.js';

export default function createSortOptions(sort: string) {
  const sortOptions = {} as mongoose.QueryOptions<ItemType>;
  if (sort) {
    const [order, property] = sort.split('_');
    sortOptions[property] = order === '1' ? 1 : -1;
  }
  return sortOptions;
}
