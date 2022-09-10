const mysql = require("mysql2/promise");
const config = require("../config/dev.json")
//const config = require("../config/prod.json")


//let connectionPool = mysql.createPool(config.dbConfig);

module.exports = mysql.createPool(config.dbConfig);
