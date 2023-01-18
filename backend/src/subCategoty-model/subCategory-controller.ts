import { Handler, Response } from 'express';
import { SubCategory } from '../category-model/category-types';

const getAllSubCategories: Handler = async (req, res: Response) => {
  try {
    const subCategories = await SubCategory.find();
    if (!subCategories) {
      return res.status(400).json({ message: 'Some error' });
    }
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};

const getSubCategory: Handler = async (req, res: Response) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id);

    if (!subCategory) {
      return res.status(400).json({ message: 'subCategory with such id doesn`t exist' });
    }
    res.status(200).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};

const createSubCategory: Handler = async (req, res: Response) => {
  try {
    const subCategory = await SubCategory.create(req.body);
    res.status(201).json(subCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};

const updateSubCategory: Handler = async (req, res: Response) => {
  try {
    const subCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      upsert: true,
    });
    res.status(200).json(subCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};

const deleteSubCategory: Handler = async (req, res: Response) => {
  try {
    const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
    res.status(200).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: 'Some error has occured', error: error });
  }
};
export { getAllSubCategories, getSubCategory, createSubCategory, updateSubCategory, deleteSubCategory };
