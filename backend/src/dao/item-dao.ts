import {ItemType} from "../item-model/item-types.js";
import {FindOptions, ModelCtor} from "sequelize";
import ItemModel, {Item} from "../db/models/Item.js";
import SubCategoryModel from "../db/models/SubCategory.js";
import CategoryModel from "../db/models/Category.js";
import ReviewModel from "../db/models/Review.js";
import UserModel from "../db/models/User.js";

const INCLUDE_OPTIONS = [
    { model: CategoryModel },
    { model: SubCategoryModel },
    { model: ReviewModel, include: [{ model: UserModel, as: 'user' }] }
];
class ItemDao {
    private itemDao: ModelCtor<Item>;

    constructor() {
        this.itemDao = ItemModel;
    }

    async list(filter: ItemType[], sortBy: string, order: string, limit: string, page: string) {
        console.log(sortBy, order)
        const options: FindOptions = {
            where: filter as any,
            include: INCLUDE_OPTIONS,
            order: [[sortBy, order]],
            limit: Number(limit),
            offset: Number(page) * Number(limit) || 0,
        };

        return this.itemDao.findAndCountAll(options);
    }

    async findById(itemId: string) {
        const item = await this.itemDao.findByPk(itemId, {
            include: INCLUDE_OPTIONS,
        });

        return item;
    }

    async create(item: Item) {
        return this.itemDao.create(item);
    }

    async update(itemId: string, itemBody: Partial<Item>) {
        const [numOfRowsUpdated, updatedItem] = await ItemModel.update(itemBody, {
            where: { id: itemId },
            returning: true,
        });

        const item = await ItemModel.findOne({
            where: { id: updatedItem[0].id },
            include: INCLUDE_OPTIONS,
        });
        return [numOfRowsUpdated, item];
    }

    async delete(itemId: string) {
        return await this.itemDao.destroy({
            where: { id: itemId },
        });
    }
}

export default new ItemDao();