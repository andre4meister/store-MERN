import { ItemType } from '../../item-model/item-types.js';
import {FindOptions} from "sequelize";
import { Op } from 'sequelize';

// TODO fix any type
export const filterUsers = (query: any) => {
  const { name, email, userName, lastName, role, phone } = query;
  let filter = {} as any;

  if (name) {
    filter = { ...filter, name: { [Op.iLike]: `%${name}%` } };
  }

  if (email) {
    filter = { ...filter, name: { [Op.iLike]: `%${email}%` } };
  }

  if (userName) {
    filter = { ...filter, name: { [Op.iLike]: `%${userName}%` } };
  }

  if (lastName) {
    filter = { ...filter, name: { [Op.iLike]: `%${lastName}%` } };
  }

  if (phone) {
    filter = { ...filter, name: { [Op.iLike]: `%${phone}%` } };
  }

  if (role) {
    filter = { ...filter, name: role };
  }

  return filter;
};
