// Imports
import Sequelize from 'sequelize';

// App Imports
import databaseConnection from '../setup/databaseConnection';

const models = {
  Users: databaseConnection.import('../modules/auth/models/users.js'),
  Posts: databaseConnection.import('../modules/blog/models/posts.js')
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = databaseConnection;
models.Sequelize = Sequelize;

export default models;
