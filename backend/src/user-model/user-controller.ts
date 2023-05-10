import {Handler, Response} from 'express';
import bcrypt from 'bcrypt';
import UserDao from "../dao/user-dao.js";
import {filterUsers} from "../utils/filters/filterUsers.js";
import LikedItemListDao from "../dao/likedItemList-dao.js";
import {ItemType} from "../item-model/item-types.js";
import ItemDao from "../dao/item-dao.js";
import CartItemDao from "../dao/cartItem-dao.js";
import CartDao from "../dao/cart-dao.js";
import generateId from "../utils/generateId.js";
import {CartItem} from "../db/models/models.js";
import {getObjectSignedUrl} from "../s3.js";

// TODO implement this type
// interface TypedRequest<T extends Query, U> extends Express.Request {
//   body: U;
//   query: T;
// }

const getUserById: Handler = async (req, res: Response) => {
    if (!req.params.id) {
        return res.status(400).send({message: 'Id is required'});
    }

    try {
        const user = await UserDao.findById(req.params.id);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const cartItems = user?.cart.cartItemsList;

        for (const item of cartItems) {
            const itemPhotos = []
            for (let image of item.item.photos) {
                image = await getObjectSignedUrl(image)
                itemPhotos.push(image)
            }
            item.item.photos = itemPhotos;
        }

        if (!user) {
            return res.status(404).send({message: `User with id ${req.params.id} doesn't exist`});
        }

        return res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};

const list: Handler = async (req, res: Response) => {
    try {
        const sortBy = (req.query.sort || 'createdAt') as string;
        const limit = (req.query.limit || '30') as string;
        const order = (req.query.order || 'DESC') as string;
        const page = (req.query.page || '0') as string;

        const users = await UserDao.list(filterUsers(req.query), sortBy, order, limit, page);
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};

const updateUser: Handler = async (req, res) => {
    if (!req.params.id) {
        return res.status(404).json({message: 'Id wasn`t denoted'});
    }
    try {
        const user = await UserDao.findById(req.params.id);

        if (!user) {
            return res.status(404).json({message: `User with id ${req.params.id} doesn't exist`});
        }

        const [numOfRowsUpdated, updatedUser] = await UserDao.update(req.params.id, req.body);

        if (numOfRowsUpdated === 0) {
            return res.status(400).json({message: 'User wasn`t updated'});
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};

const addLikedItem: Handler = async (req, res) => {
    if (!req.params.userId) {
        return res.status(404).json({message: 'Id wasn`t denoted'});
    }

    try {
        let user = await UserDao.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({message: `User with id ${req.params.userId} doesn't exist`});
        }

        const item = await ItemDao.findById(req.body.itemId);
        if (!item) {
            return res.status(404).json({message: `Item with id ${req.body.itemId} doesn't exist`});
        }

        const likedItems = await LikedItemListDao.findByUserId(req.params.userId) as any;
        const items: ItemType[] = await likedItems.getLikedItemsList();
        if (items.find(item => item.id === req.body.itemId)) {
            return res.status(400).json({message: 'Such item is already liked'});
        } else {
            await likedItems.addLikedItemsList(req.body.itemId);
            user = await UserDao.findById(req.params.userId);
            return res.status(200).json(user);
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};

const deleteLikedItem: Handler = async (req, res) => {
    if (!req.params.userId) {
        return res.status(404).json({message: 'Id wasn`t denoted'});
    }

    try {
        let user = await UserDao.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({message: `User with id ${req.params.userId} doesn't exist`});
        }

        const item = await ItemDao.findById(req.body.itemId);
        if (!item) {
            return res.status(404).json({message: `Item with id ${req.body.itemId} doesn't exist`});
        }

        const likedItems = await LikedItemListDao.findByUserId(req.params.userId) as any;
        const items: ItemType[] = await likedItems.getLikedItemsList();

        if (!items.find(item => item.id === req.body.itemId)) {
            return res.status(400).json({message: 'Such item is not liked'});
        } else {
            await likedItems.removeLikedItemsList(req.body.itemId);
            user = await UserDao.findById(req.params.userId);
            return res.status(200).json(user);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};

const addItemToUserCart: Handler = async (req, res) => {
    try {
        const itemId = req.body.itemId;
        const quantity = req.body.quantity || 1;

        if (!req.params.userId) {
            return res.status(404).json({message: 'Id wasn`t denoted'});
        }

        let user = await UserDao.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({message: 'Such user doesn`t exist'});
        }

        const item = await ItemDao.findById(itemId);
        if (!item) {
            return res.status(404).json({message: `Item with id ${itemId} doesn't exist`});
        }

        const cart = await CartDao.findByUserId(req.params.userId) as any;
        let cartItem = await CartItemDao.findByCartAndItemId(cart.id, itemId);
        if (!cartItem) {
            cartItem = await CartItemDao.create({cartId: cart.id, itemId, quantity, id: generateId()});
        }

        const cartItems = await cart.getCartItemsList();
        const itemIndex = cartItems.findIndex((item: any) => item.itemId.toString() === itemId.toString());

        if (itemIndex === -1) {
            cart.addCartItem({item: itemId, quantity});
        } else {
            cartItem.quantity = quantity;
            await cartItem.save();
        }

        user = await UserDao.findById(req.params.userId);
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};

    const deleteItemFromUserCart: Handler = async (req, res) => {
        const userId = req.params.userId;
        const itemId = req.body.itemId;

        if (!userId) {
            return res.status(404).json({message: 'Id wasn`t denoted'});
        }

        let user = await UserDao.findById(userId);
        if (!user) {
            return res.status(404).json({message: `User with id ${userId} doesn't exist`});
        }

        try {
            const item = await ItemDao.findById(itemId);
            if (!item) {
                return res.status(404).json({message: `Item with id ${itemId} doesn't exist`});
            }

            const cart = await CartDao.findByUserId(userId) as any;
            const cartItem = await CartItemDao.findByCartAndItemId(cart.id, itemId) as CartItem;
            await cartItem.destroy();

            user = await UserDao.findById(req.params.userId);
            return res.status(200).json(user);
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Some error has occurred', error: error});
        }
    };

const updateUserPassword: Handler = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({message: 'Id wasn`t denoted'});
        }

        const user = await UserDao.findByIdWithPassword(req.params.id);
        if (!user) {
            return res.status(404).json({message: 'Such user does not exist'});
        }
        const isMatch = await bcrypt.compare(req.body.old, user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'Incorrect old password'});
        }

        if (req.body.new !== req.body.confirm) {
            return res.status(400).json({message: 'New password doesn`t match confirm new password '});
        }

        const newHashedPassword = await bcrypt.hash(req.body.new, 12);
        const [numOfRowsUpdated, updatedUser] = await UserDao.update(req.params.id, {password: newHashedPassword});

        if (numOfRowsUpdated === 0) {
            return res.status(400).json({message: 'Something went wrong'});
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};

const deleteUser: Handler = async (req, res) => {
    if (!req.params.id) {
        return res.status(404).json({message: 'Id wasn`t denoted'});
    }

    try {
        const user = await UserDao.findById(req.params.id);
        if (!user) {
            return res.status(404).json({message: `User with id ${req.params.id} doesn't exist`});
        }
        const numberOfDeletedRows = await UserDao.delete(req.params.id);
        if (numberOfDeletedRows === 0) {
            return res.status(400).json({message: 'Something went wrong'});
        }
        return res.status(200).json({message: `User with id ${req.params.id} was deleted`, id: req.params.id});
    } catch (error) {
        res.status(500).json({message: 'Some error has occurred', error: error});
    }
};

export {
    list,
    getUserById,
    deleteUser,
    updateUser,
    updateUserPassword,
    addItemToUserCart,
    addLikedItem,
    deleteItemFromUserCart,
    deleteLikedItem,
};
