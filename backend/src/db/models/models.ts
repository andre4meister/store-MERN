import sequelize from '../db.js';
import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize';
import UserModel from "./User.js";
import OrderModel from "./Order.js";
import ReviewModel from "./Review.js";
import ItemModel from "./Item.js";
import SubCategoryModel from "./SubCategory.js";
import CategoryModel from "./Category.js";

export interface Cart extends Model<InferAttributes<Cart>, InferCreationAttributes<Cart>> {
    id: string;
    userId: string;
}
export interface CartItem extends Model<InferAttributes<CartItem>, InferCreationAttributes<CartItem>> {
    id: string;
    cartId: string;
    itemId: string;
    quantity: number;
}

const CartModel = sequelize.define<Cart>('cart', {
    id: {type: DataTypes.STRING, allowNull: false, primaryKey: true},
    userId: {type: DataTypes.STRING, allowNull: false},
});

const LikedItemsList = sequelize.define<Cart>('liked_items', {
    id: {type: DataTypes.STRING, allowNull: false, primaryKey: true},
    userId: {type: DataTypes.STRING, allowNull: false},
});

const CartItem = sequelize.define<CartItem>('cart_item', {
        id: {type: DataTypes.STRING, allowNull: false, primaryKey: true},
        quantity: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 1}},
        itemId: {type: DataTypes.STRING, allowNull: false},
        cartId: {type: DataTypes.STRING, allowNull: false},
    },
    {
        scopes: {
            withItem: {
                include: [
                    {
                        model: ItemModel, as: 'item',
                    }
                ]
            }
        }
    });

const ItemInfo = sequelize.define('item_info', {
    id: {type: DataTypes.STRING, primaryKey: true, allowNull: false},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

// User associations
UserModel.hasOne(CartModel, {foreignKey: 'userId', onDelete: 'CASCADE'});
CartModel.belongsTo(UserModel, {foreignKey: 'userId'});

UserModel.hasOne(LikedItemsList, {foreignKey: 'userId', as: 'likedItems', onDelete: 'CASCADE'});
LikedItemsList.belongsTo(UserModel, {foreignKey: 'userId'});

LikedItemsList.belongsToMany(ItemModel, {through: 'likedItemsListItem', as: 'likedItemsList'});

UserModel.hasMany(OrderModel, {foreignKey: 'userId', onDelete: 'CASCADE'});
OrderModel.belongsTo(UserModel, {foreignKey: 'userId'});

UserModel.hasMany(ReviewModel, {foreignKey: 'author', onDelete: 'CASCADE'});
ReviewModel.belongsTo(UserModel, {foreignKey: 'author'});

// Cart associations
CartModel.hasMany(CartItem, {foreignKey: 'cartId', as: 'cartItemsList', onDelete: 'CASCADE'});
CartItem.belongsTo(CartModel, {foreignKey: 'cartId'});

ItemModel.hasOne(CartItem, {foreignKey: 'itemId', as: 'item', onDelete: 'CASCADE'});
CartItem.belongsTo(ItemModel, {foreignKey: 'itemId'});

// Item associations
ItemModel.hasMany(ReviewModel, {foreignKey: 'itemId', onDelete: 'CASCADE'});
ReviewModel.belongsTo(ItemModel, {foreignKey: 'itemId'});

ItemModel.hasMany(ItemInfo, {foreignKey: 'itemId', onDelete: 'CASCADE'});
ItemInfo.belongsTo(ItemModel, {foreignKey: 'itemId'});

SubCategoryModel.hasOne(ItemModel, {foreignKey: 'subCategoryId'});
ItemModel.belongsTo(SubCategoryModel, {foreignKey: 'subCategoryId'});

CategoryModel.hasOne(ItemModel, {foreignKey: 'categoryId'});
ItemModel.belongsTo(CategoryModel, {foreignKey: 'categoryId'});

// Order associations
OrderModel.belongsToMany(CartItem, {through: 'orderItems', as: 'items'});
// OrderModel.hasMany(CartItem)
// CartItem.belongsToMany(OrderModel, { through: 'OrderCartItem',  targetKey: 'items'});

// Category associations
CategoryModel.hasMany(SubCategoryModel, {foreignKey: 'categoryId', onDelete: 'CASCADE'});
SubCategoryModel.belongsTo(CategoryModel, {foreignKey: 'categoryId'});

async function syncAll(force = false) {
    // await Cart.sync();
    // await LikedItemsList.sync();
    // await CartItem.sync();
    // await ItemInfo.sync();
    // await UserModel.sync();
    // await OrderModel.sync();
    // await ReviewModel.sync();
    // await ItemModel.sync();
    // await SubCategoryModel.sync();
    // await CategoryModel.sync();
    await sequelize.sync({force});
}

export {syncAll, CartModel, LikedItemsList, ItemInfo, CartItem}
