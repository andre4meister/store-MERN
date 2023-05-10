import { ItemType } from '../../item-model/item-types.js';
import {FindOptions} from "sequelize";
import { Op } from 'sequelize';

// TODO fix any type
export const filterItems = (query: any) => {
  const { minPrice, maxPrice, brand, model, isAvailable, name, category, subCategory } = query;
  let filter = {} as any;

  if (name) {
    filter = { ...filter, name: { [Op.iLike]: `%${name}%` } };
  }

  if (isAvailable) {
    filter = { ...filter, isAvailable: isAvailable === 'true' };
  }

  if (category) {
    filter = { ...filter, category: category };
  }

  if (subCategory) {
    filter = { ...filter, subCategory: subCategory };
  }

  if (brand) {
    const parsedBrand = brand.toString().split(',');
    filter = { ...filter, brand: { [Op.in]: parsedBrand } };
  }

  if (model) {
    const parsedModel = model.toString().split(',');
    filter = { ...filter, model: { [Op.in]: parsedModel } };
  }

  if (minPrice || maxPrice) {
    const priceConditions = [];
    priceConditions.push({ price: { [Op.between]: [minPrice || 0, maxPrice || Infinity] } });
    priceConditions.push({ discountPrice: { [Op.between]: [minPrice || 0, maxPrice || Infinity] } });

    filter = {
      ...filter,
      [Op.and]: [
        {
          [Op.or]: priceConditions,
        },
      ],
    };
  }

  return filter;
};
