import  {CartItem} from "../db/models/models.js";

class CartItemDao {
    private cartItemDao: typeof CartItem;

    constructor() {
        this.cartItemDao = CartItem;
    }

    async findById(cartItemId: string) {
        return this.cartItemDao.findByPk(cartItemId);
    }

    async findByCartAndItemId(cartId: string, itemId: string) {
        return this.cartItemDao.findOne({where: {cartId, itemId}});
    }

    async create(cartItem: any) {
        return this.cartItemDao.create(cartItem);
    }

    async update(cartItemId: string, cartItemBody: Partial<{}>) {
        return this.cartItemDao.update(cartItemBody, {where: {id: cartItemId}});
    }

    async delete(cartItemId: string) {
        return this.cartItemDao.destroy({where: {id: cartItemId}});
    }
}

export default new CartItemDao();