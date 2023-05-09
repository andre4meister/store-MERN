import { Handler, Response } from 'express';
import CategoryDao from "../dao/category-dao.js";
import generateId from "../utils/generateId.js";

const list: Handler = async (req, res: Response) => {
  try {
    const categories = await CategoryDao.list();
    if (!categories) {
      return res.status(400).json({ message: 'Some error, no such categories' });
    }
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Some error has occurred', error: error });
  }
};

const getById: Handler = async (req, res: Response) => {
  try {
    const category = await CategoryDao.findById(req.params.id);

    if (!category) {
      return res.status(400).json({ message: 'category with such id doesn`t exist' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Some error has occurred', error: error });
  }
};

const createCategory: Handler = async (req, res: Response) => {
  const body = {...req.body, id: generateId()};

  try {
    const category = await CategoryDao.create(body);
    res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Some error has occurred', error: error });
  }
};

const updateCategory: Handler = async (req, res: Response) => {
  try {
    const [numOfRowsUpdated, updatedCategories] = await CategoryDao.update(req.params.id, req.body);
    const category = updatedCategories;

    if(!numOfRowsUpdated) return res.status(400).json({ message: `Category with id ${req.params.id} does not exist` });

    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Some error has occurred', error });
  }
};

const deleteCategory: Handler = async (req, res: Response) => {
  try {
    if(!req.params.id) return res.status(400).json({ message: 'No id provided' });

    const category = await CategoryDao.findById(req.params.id);
    if(!category) return res.status(400).json({ message: 'No category with such id' });

    await CategoryDao.delete(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Some error has occurred', error });
  }
};
export { list, getById, createCategory, updateCategory, deleteCategory };
