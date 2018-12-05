import databaseConnection from '../../../setup/databaseConnection';

const models = {
  Users: databaseConnection.import('./users.js')
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

export default models;
