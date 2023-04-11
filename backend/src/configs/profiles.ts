const profiles = ["admin", "moderator", "user", "anonim"];

const ENTITIES = {
    users: {
        post: "users/post",
        put: "users/put",
        delete: "users/delete",
        get: "users/get",
        "users/addUserToLikedItems": "users/addUserToLikedItems/put",
        "users/deleteUserFromLikedItems": "users/deleteUserFromLikedItems/put",
        "users/addItemToUserCart": "users/addItemToUserCart/put",
        "users/deleteItemFromUserCart": "users/deleteItemFromUserCart/put",
        "users/change-password": "users/change-password/put",
    },
    items: {
        post: "items/post",
        put: "items/put",
        delete: "items/delete",
        get: "items/get",

    },
    categories: {
        post: "category/post",
        put: "category/put",
        delete: "category/delete",
        get: "category/get",
    },
    subCategories: {
        post: "subCategory/post",
        put: "subCategory/put",
        delete: "subCategory/delete",
        get: "subCategory/get",
    },
    orders: {
        post: "orders/post",
        put: "orders/put",
        delete: "orders/delete",
        get: "orders/get",
    },
    reviews: {
        post: "reviews/post",
        put: "reviews/put",
        delete: "reviews/delete",
        get: "reviews/get",
    },

}
const mappingsUseCasesProfiles = {
    "auth/login/post": ["anonim"],
    "auth/register/post": ["anonim"],
    [ENTITIES.users.post]: ["admin", "moderator", "anonim"],
    [ENTITIES.users.put]: ["admin", "moderator", "user"],
    [ENTITIES.users.delete]: ["admin", "moderator", "user"],
    [ENTITIES.users.get]: ["admin", "moderator", "user"],
    [ENTITIES.users["users/addUserToLikedItems"]]: ["admin", "moderator", "user"],
    [ENTITIES.users["users/deleteUserFromLikedItems"]]: ["admin", "moderator", "user"],
    [ENTITIES.users["users/addItemToUserCart"]]: ["admin", "moderator", "user"],
    [ENTITIES.users["users/deleteItemFromUserCart"]]: ["admin", "moderator", "user"],
    [ENTITIES.users["users/change-password"]]: ["admin", "moderator", "user"],
    [ENTITIES.items.post]: ["admin", "moderator"],
    [ENTITIES.items.put]: ["admin", "moderator"],
    [ENTITIES.items.delete]: ["admin", "moderator"],
    [ENTITIES.items.get]: ["admin", "moderator", "user", "anonim"],
    [ENTITIES.categories.post]: ["admin", "moderator"],
    [ENTITIES.categories.put]: ["admin", "moderator"],
    [ENTITIES.categories.delete]: ["admin", "moderator"],
    [ENTITIES.categories.get]: ["admin", "moderator", "user", "anonim"],
    [ENTITIES.subCategories.post]: ["admin", "moderator"],
    [ENTITIES.subCategories.put]: ["admin", "moderator"],
    [ENTITIES.subCategories.delete]: ["admin", "moderator"],
    [ENTITIES.subCategories.get]: ["admin", "moderator", "user", "anonim"],
    [ENTITIES.orders.post]: ["admin", "moderator", "user"],
    [ENTITIES.orders.put]: ["admin", "moderator", "user"],
    [ENTITIES.orders.delete]: ["admin", "moderator", "user"],
    [ENTITIES.orders.get]: ["admin", "moderator", "user"],
    [ENTITIES.reviews.post]: ["user"],
    [ENTITIES.reviews.put]: ["admin", "moderator", "user"],
    [ENTITIES.reviews.delete]: ["admin", "moderator", "user"],
    [ENTITIES.reviews.get]: ["admin", "moderator", "user", "anonim"],
}

export { profiles, mappingsUseCasesProfiles };
