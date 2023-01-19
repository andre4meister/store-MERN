import { check } from 'express-validator';
// WIP Rewrite all validations
const registerValidation = [
  check('email', 'Incorrect email').isEmail().isLength({ min: 8, max: 26 }),
  check('password', 'Incorrect password').isLength({ min: 8, max: 16 }),
  check('userName', 'Incorrect userName').isLength({ min: 6, max: 16 }),
];

const loginValidation = [
  check('email', 'Incorrect email').isEmail().isLength({ min: 8, max: 26 }),
  check('password', 'Incorrect password').isLength({ min: 8, max: 16 }),
];

const createItemValidation = [
  check('email', 'Incorrect email').isEmail(),
  check('password', 'Incorrect password').isLength({ min: 8, max: 16 }),
];

const createOrderValidation = [
  check('email', 'Incorrect email').isEmail(),
  check('password', 'Incorrect password').isLength({ min: 8, max: 16 }),
];

const createCategoryValidation = [
  check('email', 'Incorrect email').isEmail(),
  check('password', 'Incorrect password').isLength({ min: 8, max: 16 }),
];

const createSubCategoryValidation = [
  check('email', 'Incorrect email').isEmail(),
  check('password', 'Incorrect password').isLength({ min: 8, max: 16 }),
];

const allValidationChecks = [
  registerValidation,
  loginValidation,
  createCategoryValidation,
  createItemValidation,
  createOrderValidation,
  createSubCategoryValidation,
];

export {
  allValidationChecks,
  createCategoryValidation,
  createItemValidation,
  createOrderValidation,
  createSubCategoryValidation,
  loginValidation,
  registerValidation,
};
