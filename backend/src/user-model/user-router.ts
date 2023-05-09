import { Router } from 'express';
import {
  deleteUser,
  list,
  getUserById,
  updateUser,
  updateUserPassword,
  addItemToUserCart,
  addLikedItem,
  deleteItemFromUserCart,
  deleteLikedItem,
} from './user-controller.js';

const userRouter = Router();

userRouter.get('/', list);

userRouter.get('/:id', getUserById);

userRouter.put('/:id', updateUser);

userRouter.put('/change-password/:id', updateUserPassword);

userRouter.put('/addItemToUserCart/:userId', addItemToUserCart);
userRouter.put('/deleteItemFromUserCart/:userId', deleteItemFromUserCart);

userRouter.put('/addUserToLikedItems/:userId', addLikedItem);
userRouter.put('/deleteUserFromLikedItems/:userId', deleteLikedItem);

userRouter.delete('/:id', deleteUser);

export { userRouter };
