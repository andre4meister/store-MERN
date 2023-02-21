import { check } from 'express-validator';
import { OrderStatus, PaymentStatus } from '../order-model/order-types.js';
import { ShipmentMethodType } from '../user-model/user-types.js';

const registerValidation = [
  check('email', 'Incorrect email').isEmail().isLength({ min: 8, max: 26 }),
  check('password', 'Incorrect password').isLength({ min: 8, max: 16 }),
  check('userName', 'Incorrect userName').isLength({ min: 6, max: 16 }),
  check('phone', 'Incorrect phone').isLength({ min: 10, max: 14 }).isNumeric({ no_symbols: true }),
];

const loginValidation = [
  check('email', 'Incorrect email').isEmail().isLength({ min: 8, max: 26 }),
  check('password', 'Incorrect password').isLength({ min: 8, max: 16 }),
];

const createItemValidation = [
  check('name', 'Incorrect item name').isString().isLength({ min: 5, max: 80 }),
  check('description', 'Incorrect description').isString().exists(),
  check('category', 'Incorrect category').exists().isMongoId(),
  check('subCategory', 'Incorrect subCategory').exists().isMongoId(),
  check('price', 'Incorrect price').exists().isNumeric(),
  check('discountPrice', 'Incorrect discountPrice').exists().isNumeric(),
  check('isAvailable', 'Incorrect isAvailable').exists().isBoolean(),
  check('brand', 'Incorrect brand').isString(),
  check('model', 'Incorrect model').isString(),
];

const createOrderValidation = [
  check('userId', 'Incorrect userId').isMongoId(),
  check('orderStatus', 'Incorrect orderStatus')
    .exists()
    .custom((value) => value === OrderStatus),
  check('paymentStatus', 'Incorrect paymentStatus')
    .exists()
    .custom((value) => value === PaymentStatus),
  check('price', 'Incorrect price').isNumeric().exists(),
  check('message', 'Incorrect message').isString(),
  check('shipmentMethod', 'Incorrect shipmentMethod')
    .isString()
    .custom((value) => value === ShipmentMethodType),
  check('delivery', 'Incorrect delivery').isObject().exists(),
];

const createReviewValidation = [
  check('userId', 'Incorrect userId').isMongoId(),
  check('text', 'Incorrect userId').isString(),
  check('point', 'Incorrect point').isNumeric().exists(),
];

const createCategoryValidation = [
  check('name', 'Incorrect item name').isString().isLength({ min: 3, max: 100 }),
  check('description', 'Incorrect description').isString().exists(),
  check('icon', 'Incorrect icon').isString().exists(),
  check('subCategories', 'Incorrect subCategories').isArray(),
];

const createSubCategoryValidation = [
  check('name', 'Incorrect item name').isString().isLength({ min: 3, max: 100 }),
  check('description', 'Incorrect description').isString().exists(),
  check('photo', 'Incorrect photo').isString().exists(),
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
  createReviewValidation,
  createSubCategoryValidation,
  loginValidation,
  registerValidation,
};
