// Import MySQL connection.
const connection = require('./connection.js');

// Helper function for SQL syntax to add question marks (?, ?, ?) in query
function printQuestionMarks(num) {
 const arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
};

// Helper function to convert object key/value pairs to SQL syntax
 function objToSql(ob){
  const arr = [];

  // Loop through the keys and push the key/value as a string int arr
  for (const key in ob) {
    let value = ob[key];

    // Check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {

      // If string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf("") >= 0) {
        value = " " + value + "";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {devoured: true} => ["devoured=true"]
      arr.push(key  + "=" + value);
    }
  }

  // Translate array of strings to a single comma-separated string
  return arr.toString();
};

// Object for all our SQL statement functions.
const orm = {
  selectAll: function (tableInput, cb) {
   const queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

insertOne: function (table, cols, vals, cb) {
   const queryString = "INSERT INTO" + table;

    queryString += ' (';
    queryString += cols.toString();
    queryString += ') ';
    queryString += 'VALUES (';
    queryString += printQuestionMarks(vals.length);
    queryString += ') ';

    console.log(queryString);

    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  // An example of objColVals would be {name: panther, devoured: true}
  updateOne: function (table, objColVals, condition, cb) {
   const  queryString = "UPDATE" + table;

    queryString += ' SET ';
    queryString += objToSql(objColVals);
    queryString += ' WHERE ';
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);

    });
  },


  //delete callout
  deleteOne: function (table, key, cb) {
     const queryString = "DELETE FROM ?? WHERE ID = ?;";

     connection.query(queryString, [table, key], (err, result) => {

      if (err)  throw err;
       cb(result);

    });
  
  },


};

// Export the orm object for the model (devoured.js).
module.exports = orm;
