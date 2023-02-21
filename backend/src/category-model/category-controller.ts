import { Handler, Response } from 'express';
import { Category } from './category-types.js';

const getAllCategories: Handler = async (req, res: Response) => {
  try {
    const categories = await Category.find().populate('subCategories');
    if (!categories) {
      return res.status(400).json({ message: 'Some error, no such categories' });
    }
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};

const getCategory: Handler = async (req, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(400).json({ message: 'category with such id doesn`t exist' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};

const createCategory: Handler = async (req, res: Response) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};

const updateCategory: Handler = async (req, res: Response) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, upsert: true });
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};

const deleteCategory: Handler = async (req, res: Response) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};
export { getAllCategories, getCategory, createCategory, updateCategory, deleteCategory };
