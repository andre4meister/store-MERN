import { Handler, Response } from 'express';
import SubCategoryDao from "../dao/subCategory-dao.js";
const list: Handler = async (req, res: Response) => {
  try {
    const subCategories = await SubCategoryDao.list();
    if (!subCategories) {
      return res.status(400).json({ message: 'Some error' });
    }
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(500).json({ message: 'Some error has occurred', error: error });
  }
};

const getById: Handler = async (req, res: Response) => {
  try {
    const subCategory = await SubCategoryDao.findById(req.params.id);

    if (!subCategory) {
      return res.status(400).json({ message: 'subCategory with such id doesn`t exist' });
    }
    res.status(200).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: 'Some error has occurred', error: error });
  }
};

const createSubCategory: Handler = async (req, res: Response) => {
  try {
    const subCategory = await SubCategoryDao.create(req.body);
    res.status(201).json(subCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Some error has occurred', error: error });
  }
};

const updateSubCategory: Handler = async (req, res: Response) => {
  try {
    const subCategory = await SubCategoryDao.update(req.params.id, req.body);
    res.status(200).json(subCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Some error has occurred', error: error });
  }
};

const deleteSubCategory: Handler = async (req, res: Response) => {
  try {
    const subCategory = await SubCategoryDao.delete(req.params.id);
    res.status(200).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: 'Some error has occurred', error: error });
  }
};
export { list, getById, createSubCategory, updateSubCategory, deleteSubCategory };
