const { Sequelize ,DataTypes} = require('sequelize');


const sequelize = new Sequelize('store_dashboard', 'node', 'Rajkishore@210', {
    host: 'localhost',
    dialect:  'mysql' ,
    logging:false
  })

  try {
     sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.item = require('./itemModel')(sequelize, DataTypes);
db.sequelize.sync({ force: false });

// require('./itemModel')(sequelize, DataTypes);
// sequelize.sync({ force: true });
  module.exports = db