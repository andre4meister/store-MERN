import mongoose from 'mongoose';
import { ItemType } from '../../product-model/item-types.js';

export const filterItems = (query: any) => {
  const { minPrice, maxPrice, brand, model, isAvailable, name, category, subCategory } = query;
  let filter: mongoose.FilterQuery<ItemType> = {};

  if (name) {
    filter = { ...filter, name: { $regex: name, $options: 'i' } };
  }

  if (isAvailable) {
    filter = { ...filter, isAvailable: isAvailable === 'true' ? true : false };
  }

  if (category) {
    filter = {
      ...filter,
      category: {
        $in: [category],
      },
    };
  }
  if (subCategory) {
    filter = {
      ...filter,
      subCategory: {
        $in: [subCategory],
      },
    };
  }

  if (brand) {
    const parsedBrand = brand.toString().split(',');
    filter = { ...filter, brand: { $in: parsedBrand } };
  }

  if (model) {
    const parsedModel = model.toString().split(',');
    filter = { ...filter, model: { $in: parsedModel } };
  }

  if (minPrice || maxPrice) {
    const priceConditions = [];
    priceConditions.push({ price: { $gte: minPrice || 0, $lte: maxPrice || Infinity } });
    priceConditions.push({ discountPrice: { $gte: minPrice || 0, $lte: maxPrice || Infinity } });

    filter = {
      ...filter,
      $and: [
        {
          $or: priceConditions,
        },
      ],
    };
  }

  return filter;
};
