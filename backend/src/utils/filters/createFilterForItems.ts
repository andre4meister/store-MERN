import mongoose from 'mongoose';
import { ItemType } from '../../product-model/item-types';

export const createFilterForItems = (query: any) => {
  const { minPrice, maxPrice, brand, model, isAvailable, name, category, subCategory } = query;
  let filter: mongoose.FilterQuery<ItemType> = {};

  if (name) {
    filter = { ...filter, name: { $regex: name, $options: 'i' } };
  }
  if (minPrice || maxPrice) {
    filter = { ...filter, price: { $gte: minPrice || 0, $lte: maxPrice || Infinity } };
  }
  if (isAvailable) {
    filter = { ...filter, isAvailable: isAvailable === 'true' ? true : false };
  }
  if (brand) {
    const parsedBrand = brand.toString().split(',');
    filter = { ...filter, brand: { $in: parsedBrand } };
  }
  if (model) {
    const parsedModel = model.toString().split(',');
    filter = { ...filter, model: { $in: parsedModel } };
  }
  // if (category) {
  //   filter = { ...filter, category: { $in: {}} };
  // }
  // if (subCategory) {
  //   filter = { ...filter, subCategory: subCategory };
  // }
  return filter;
};
