import dotenv from 'dotenv';
dotenv.config();

export default {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'myapi_dev',
    host: 'localhost',
    dialect: 'mysql'
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'myapi_test',
    host: 'localhost',
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'myapi_prod',
    host: 'localhost',
    dialect: 'mysql'
  }
};
