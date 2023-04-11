import { Handler, Response } from 'express';
import CategoryDao from "../dao/category-dao.js";
import SubCategoryDao from "../dao/subCategory-dao.js";
import { filterItems } from '../utils/filters/filterItems.js';
import ItemDao from "../dao/item-dao.js";

const list: Handler = async (req, res: Response) => {
  try {
    if (req.query) {
      const sort = req.query.sort as string;
      const limit = req.query.sort as string;

      const items = await ItemDao.list(filterItems(req.query), sort, limit);
      return res.status(200).json(items);
    }

  } catch (error) {
    res.status(500).json({ message: 'Some error has occurred', error: error });
  }
};

const getById: Handler = async (req, res: Response) => {
  try {
    const item = await ItemDao.findById(req.params.id);

    if (!item) {
      return res.status(400).json({ message: 'Item with such id doesn`t exist' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Some error has occurred', error: error });
  }
};

const createItem: Handler = async (req, res: Response) => {
  try {
    const category = await CategoryDao.findById(req.body.category);
    const subCategory = await SubCategoryDao.findById(req.body.subCategory);

    const body = { ...req.body, subCategory: subCategory, category: category };
    const item = await ItemDao.create(body);

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Some error has occurred', error: error });
  }
};

const updateItem: Handler = async (req, res: Response) => {
  try {
    const item = await ItemDao.update(req.params.id, req.body);
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Some error has occurred', error: error });
  }
};

const deleteItem: Handler = async (req, res: Response) => {
  try {
    const item = await ItemDao.findById(req.params.id);
    if (!item) {
        return res.status(400).json({ message: 'Item with such id doesn`t exist' });
    }

    await ItemDao.delete(req.params.id);
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Some error has occurred', error: error });
  }
};
export { list, getById, createItem, updateItem, deleteItem };
