import  {CartModel} from "../db/models/models.js";

class CartDao {
    private cartDao: typeof CartModel;

    constructor() {
        this.cartDao = CartModel;
    }

    async findById(cartId: string) {
        return this.cartDao.findByPk(cartId);
    }

    async findByUserId(userId: string) {
        return this.cartDao.findOne({where: {userId: userId}});
    }

    async create(cart: any) {
        return this.cartDao.create(cart);
    }

    async update(cartId: string, cartBody: Partial<{}>) {
        return this.cartDao.update(cartBody, {where: {id: cartId}});
    }

    async delete(cartId: string) {
        return this.cartDao.destroy({where: {id: cartId}});
    }
}

export default new CartDao();