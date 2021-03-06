// Import the ORM to create functions that will interact with the database.
const orm = require('../config/orm.js');

const burger = {
  all: function (cb) {
    orm.selectAll('burgers', function (res) { 
    cb(res);
  });

  },

  // The variables cols and vals are arrays.
  create: function (cols, vals, cb) {
    orm.insertOne('burgers', cols, vals, function (res) {
      cb(res);
    });
  },

  update: function(objColVals, condition, cb) {
    orm.updateOne('burgers', objColVals, condition, function (res) {
      cb(res);
    });

  },

// Delete burger from database
delete(condition, cb) {
  orm.delete('burgers', condition, function (res) {
    cb(res);
  });

  },

};

// Export the database functions for the controller (burgersController.js).
module.exports = burger;
