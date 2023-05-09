import {CartItem} from "../db/models/models.js";
import ItemDao from "../dao/item-dao.js";
import {Item} from "../db/models/Item.js";

export default async function checkItemsSum(items: CartItem[]) {
    try {
        const fullItems = await Promise.all(items.map(async item => {
            const fullItem = await ItemDao.findById(item.itemId) as Item;
            return {item: fullItem, quantity: item.quantity};
        }));
        let sum = 0;
        fullItems.forEach(item => {
            sum += (item.item.discountPrice ? item.item.discountPrice : item.item.price) * item.quantity;
        });
        return sum;
    } catch (e) {
        console.log(e)
        throw new Error("Some items was not found")
    }
}