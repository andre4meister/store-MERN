import { Router } from 'express';
import { check } from 'express-validator';
import { register, login } from '../authorization/auth-controller';

const authRouter = Router();

authRouter.post(
  '/register',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Incorrect password').isLength({ min: 8, max: 16 }),
    check('userName', 'Incorrect userName').isLength({ min: 6, max: 16 }),
  ],
  register,
);
authRouter.post(
  '/login',
  [check('email', 'Incorrect email').isEmail(), check('password', 'Incorrect password').isLength({ min: 8, max: 16 })],
  login,
);
authRouter.post('change-password');

export { authRouter };
