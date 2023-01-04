import { Handler, Response } from 'express';
import mongoose from 'mongoose';
import { Category, SubCategory } from '../category-model/category-types';
import { itemScheme } from './item-types';

const Item = mongoose.model('Item', itemScheme);

const getAllItems: Handler = async (req, res: Response) => {
  try {
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
    console.log(req.query);
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
    const categ = await Category.findById(req.body.category).populate(['name', 'description', '_id']);
    const subCateg = await SubCategory.findById(req.body.subCategory).populate(['name', 'description', '_id']);
    const body = { ...req.body, subCategory: subCateg, category: categ };
    const item = (await Item.create(body)).$assertPopulated(
      ['category', 'subCategory'],
      ['name', 'description', '_id'],
    );
    res.status(201).json(item);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};

const updateItem: Handler = async (req, res: Response) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, upsert: true }).populate(
      ['category', 'subCategory'],
      ['name', 'description', '_id'],
    );
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};

const deleteItem: Handler = async (req, res: Response) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    // .populate(
    //   ['category', 'subCategory'],
    //   ['name', 'description', '_id'],
    // );
    res.status(204).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};
export { Item, getAllItems, getItem, createItem, updateItem, deleteItem };
