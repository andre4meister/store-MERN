import { Router } from 'express';
import authMiddleware from '../middleWare/authMiddleware';
import {
  deleteUser,
  getUsers,
  updateUser,
  updateUserPassword,
  addItemToUserCart,
  addUserLikedItem,
  deleteItemFromUserCart,
  deleteUserLikedItem,
} from './user-controller';

const userRouter = Router();

userRouter.use('/:id', authMiddleware);

userRouter.get('/', getUsers);

userRouter.get('/:id', getUsers);

userRouter.put('/:id', updateUser);

userRouter.put('/change-password/:id', updateUserPassword);

userRouter.put('/addItemToUserCart/:id', addItemToUserCart);
userRouter.put('/deleteItemFromUserCart/:id', deleteItemFromUserCart);

userRouter.put('/addUserLikedItem/:id', addUserLikedItem);
userRouter.put('/deleteUserLikedItem/:id', deleteUserLikedItem);

userRouter.delete('/:id', deleteUser);

export { userRouter };
