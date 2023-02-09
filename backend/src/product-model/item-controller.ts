import { Handler, Response } from 'express';
import mongoose from 'mongoose';
import { Category, SubCategory } from '../category-model/category-types';
import { createFilterForItems } from '../utils/filters/createFilterForItems';
import createSortOptions from '../utils/filters/createSortOptions';
import { itemScheme } from './item-types';

const Item = mongoose.model('item', itemScheme);

const getAllItems: Handler = async (req, res: Response) => {
  try {
    if (req.query) {
      const sort = req.query.sort as string;
      const limit = req.query.sort;
      console.log('category:' + req.query.category);
      const items = await Item.find(createFilterForItems(req.query))
        .limit(Number(limit) || 30)
        .sort(createSortOptions(sort))
        .populate(['category', 'subCategory'])
        .collation({ locale: 'en', strength: 2 });
      return res.status(200).json(items);
    }

    const items = await Item.find().populate(['category', 'subCategory']);
    if (!items) {
      return res.status(400).json({ message: 'Some error' });
    }
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};

const getItem: Handler = async (req, res: Response) => {
  try {
    const item = await Item.findById(req.params.id).populate(['category', 'subCategory']);

    if (!item) {
      return res.status(400).json({ message: 'Item with such id doesn`t exist' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};

const createItem: Handler = async (req, res: Response) => {
  try {
    const categ = await Category.findById(req.body.category);
    const subCateg = await SubCategory.findById(req.body.subCategory);

    const body = { ...req.body, subCategory: subCateg, category: categ };
    const item = await Item.create(body);

    res.status(201).json(item);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};

const updateItem: Handler = async (req, res: Response) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, upsert: true }).populate([
      'category',
      'subCategory',
    ]);
    res.status(200).json(item);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};

const deleteItem: Handler = async (req, res: Response) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id).populate(['category', 'subCategory']);
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};
export { Item, getAllItems, getItem, createItem, updateItem, deleteItem };
