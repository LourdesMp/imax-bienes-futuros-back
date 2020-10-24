const mysql = require('mysql');
const envJson = require("../env.json");
const port = process.env.PORT || 8000;

//PRODUCCION
//process.env = envJson["qa"];

//DESARROLLO
process.env = envJson['dev']

process.env.PORT = port;


const connection = mysql.createConnection({
  host: process.env.hostDB,
  user: process.env.userDB,
  password: process.env.passwordDB,
  database: process.env.databaseDB,
});

//connection.connect();
//connection.end();

module.exports = connection;
