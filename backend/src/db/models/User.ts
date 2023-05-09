import {DataTypes, Model, InferAttributes, InferCreationAttributes} from 'sequelize';
import {RoleEnum} from "../../user-model/user-types.js";
import {profiles} from "../../configs/profiles.js";
import sequelize from "../db.js";

export interface User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    id: string;
    userName: string;
    firstName?: string | null;
    lastName?: string | null;
    role: RoleEnum;
    email: string;
    password: string;
    phone?: string | null;
}

const UserModel = sequelize.define<User>('user', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    userName: {
        type: DataTypes.STRING(24),
        allowNull: false,
        unique: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    role: {
        type: DataTypes.ENUM(...profiles),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(24),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
            isNumeric: true,
        },
    },
}, {
    tableName: 'users',
    timestamps: true,
    scopes: {
        withoutPassword: {
            attributes: { exclude: ['password'] },
        }
    }
});

export default UserModel;
