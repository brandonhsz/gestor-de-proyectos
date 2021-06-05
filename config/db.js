const { Sequelize } = require('sequelize');
// Option 2: Passing parameters separately (other dialects)
const db = new Sequelize('uptasknode', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  defines: {
    timestamps: false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = db;