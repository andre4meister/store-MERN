import { Router } from 'express';
import authMiddleware from '../middleWare/authMiddleware';
import { deleteUser, getUsers, updateUser, updateUserPassword } from './user-controller';

const userRouter = Router();

userRouter.use('/:id', authMiddleware);
userRouter.get('/', getUsers);

userRouter.get('/:id', getUsers);

userRouter.put('/:id', updateUser);

userRouter.put('/change-password/:id', updateUserPassword);

userRouter.delete('/:id', deleteUser);

export { userRouter };
