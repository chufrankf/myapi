import Sequelize from 'sequelize';
import databaseConnection from '../setup/databaseConnection';
import AuthModels from '../modules/auth/models';
import BlogModels from '../modules/blog/models';

const models = Object.assign(AuthModels, BlogModels);

models.sequelize = databaseConnection;
models.Sequelize = Sequelize;

export default models;
