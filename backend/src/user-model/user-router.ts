import { Router } from 'express';
import {
  deleteUser,
  getUsers,
  updateUser,
  updateUserPassword,
  addItemToUserCart,
  addUserLikedItem,
  deleteItemFromUserCart,
  deleteUserLikedItem,
} from './user-controller.js';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', getUsers);

userRouter.put('/:id', updateUser);

userRouter.put('/change-password/:id', updateUserPassword);

userRouter.put('/addItemToUserCart/:userId', addItemToUserCart);
userRouter.put('/deleteItemFromUserCart/:userId', deleteItemFromUserCart);

userRouter.put('/addUserToLikedItems/:userId', addUserLikedItem);
userRouter.put('/deleteUserFromLikedItems/:userId', deleteUserLikedItem);

userRouter.delete('/:id', deleteUser);

export { userRouter };
