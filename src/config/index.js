import dotenv from 'dotenv';
dotenv.config();

export default {
  database: {
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
  },
  jwt: process.env.JWT_SECRET,
  port: 9080,
  env: process.env.NODE_ENV || 'development'
};