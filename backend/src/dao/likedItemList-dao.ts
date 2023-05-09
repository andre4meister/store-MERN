import {LikedItemsList} from "../db/models/models.js";

class LikedItemsListDao {
    private likedItemsListDao: typeof LikedItemsList;

    constructor() {
        this.likedItemsListDao = LikedItemsList;
    }

    async findById(likedItemsListId: string) {
        return this.likedItemsListDao.findByPk(likedItemsListId, {
            include: [{all: true}]
        });
    }

    async findByUserId(userId: string) {
        return this.likedItemsListDao.findOne(
            {
                where: {userId: userId},
                include: [{all: true}]
            }
        );
    }

    async create(likedItemsList: any) {
        return this.likedItemsListDao.create(likedItemsList);
    }

    async update(userId: string, likedItemsList: Partial<{}>) {
        return this.likedItemsListDao.update({}, {where: {userId}});
    }

    async delete(likedItemsListId: string) {
        return this.likedItemsListDao.destroy({where: {id: likedItemsListId}});
    }
}

export default new LikedItemsListDao();