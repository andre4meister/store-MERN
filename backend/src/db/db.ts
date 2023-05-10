import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.DB_URL);
const sequelize = new Sequelize(process.env.DB_URL as string + '?ssl=true');
// const sequelize = new Sequelize(
//     process.env.DB_NAME as string,
//     process.env.DB_USER as string,
//     process.env.DB_PASSWORD as string,
//     {
//         host: process.env.DB_HOST as string,
//         port: Number(process.env.DB_PORT),
//         dialect: 'postgres',
//     });

// TODO implement test and dev databases
// let sequelize
//
// if (process.env.NODE_ENV === 'development') {
//     sequelize = new Sequelize(process.env.DEV_DATABASE_URL)
// } else if (process.env.NODE_ENV === 'test') {
//     sequelize = new Sequelize(process.env.TEST_DATABASE_URL)
// } else {
//     sequelize = new Sequelize(process.env.DATABASE_URL)
// }
export default sequelize;