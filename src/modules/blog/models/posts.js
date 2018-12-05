// Posts
export default (sequelize, Sequelize) => {
  return sequelize.define('posts', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    author: { type: Sequelize.STRING, primaryKey: true },
    title: { type: Sequelize.STRING },
    content: { type: Sequelize.TEXT },
    status: { type: Sequelize.STRING },
    date: { type: Sequelize.DATE }
  });
};