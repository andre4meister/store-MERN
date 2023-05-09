import {Handler, Response} from 'express';
import CategoryDao from "../dao/category-dao.js";
import SubCategoryDao from "../dao/subCategory-dao.js";
import {filterItems} from '../utils/filters/filterItems.js';
import ItemDao from "../dao/item-dao.js";
import generateId from "../utils/generateId.js";
import { uploadFile, deleteFile, getObjectSignedUrl } from '../s3.js';
import multer from 'multer';
import crypto from "crypto";

const storage = multer.memoryStorage()
export const upload = multer({ storage: storage })

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const list: Handler = async (req, res: Response) => {
    try {
        const sortBy = (req.query.sort || 'createdAt') as string;
        const limit = (req.query.limit || '30') as string;
        const order = (req.query.order || 'ASC') as string;
        const page = (req.query.page || '0') as string;

        const items = await ItemDao.list(filterItems(req.query), sortBy, order, limit, page);
        for (const item of items.rows) {
            const itemPhotos = []
             for (let image of item.photos) {
                image = await getObjectSignedUrl(image)
                 itemPhotos.push(image)
            }
             item.photos = itemPhotos;
        }
        return res.status(200).json(items);

    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};

const getById: Handler = async (req, res: Response) => {
    try {
        const item = await ItemDao.findById(req.params.id);

        if (!item) {
            return res.status(400).json({message: `Item with id ${req.params.id} doesn't exist`});
        }

        const photos = []
        for (let image of item.photos) {
            image = await getObjectSignedUrl(image)
            photos.push(image)
        }
        item.photos = photos;
        res.status(200).json(item);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};

const createItem: Handler = async (req, res: Response) => {
    const files = req.files as Express.Multer.File[];

    try {
        const {categoryId, subCategoryId} = req.body;

        const category = await CategoryDao.findById(req.body.categoryId);
        if (!category) {
            return res.status(400).json({message: `Category with id ${req.body.categoryId} does not exist`});
        }

        const subCategory = await SubCategoryDao.findById(req.body.subCategoryId);
        if (!subCategory) {
            return res.status(400).json({message: `SubCategory with id ${req.body.subCategoryId} does not exist`});
        }

        const photos = []
        for (const file of files) {
            const key = generateFileName();
            await uploadFile(file?.buffer as Buffer, key, file?.mimetype as string)
            photos.push(key)
        }

        const body = {...req.body, subCategoryId, photos, categoryId, id: generateId()};
        const item = await ItemDao.create(body);

        res.status(201).json(item);
    } catch (error) {
        console.log(error)

        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};

const updateItem: Handler = async (req, res: Response) => {
    try {
        const itemToUpdate = await ItemDao.findById(req.params.id);
        if (!itemToUpdate) {
            return res.status(400).json({message: `Item with id ${req.params.id} does not exist`});
        }

        const photos = []
        if (req?.files && req.files?.length > 0) {
            for (const photo of itemToUpdate.photos) {
                await deleteFile(photo)
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            for (const file of req.files) {
                const key = generateFileName();
                await uploadFile(file?.buffer as Buffer, generateFileName(), file?.mimetype as string)
                photos.push(key)
            }
        }

        const updatedBody = {...req.body, ...(photos.length > 0 && {photos})};
        const [numOfRowsUpdated, item] = await ItemDao.update(req.params.id, updatedBody);
        if (numOfRowsUpdated === 0) {
            return res.status(400).json({message: `Item with id ${req.params.id} does not exist`});
        }

        res.status(200).json(item);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};

const deleteItem: Handler = async (req, res: Response) => {
    try {
        const item = await ItemDao.findById(req.params.id);
        if (!item) {
            return res.status(400).json({message: `Item with id ${req.params.id} does not exist`});
        }

        for (const photo of item.photos) {
            console.log("photo", photo)
            await deleteFile(photo)
        }

        await ItemDao.delete(req.params.id);
        res.status(200).json(item);
    } catch (error) {
        console.log(error)

        res.status(500).json({message: 'Some error has occurred', error});
    }
};
export {list, getById, createItem, updateItem, deleteItem};
