const mysql = require("mysql2");
require("dotenv").config();

const host =
  `${process.env.NODE_ENV}` === "dev"
    ? `${process.env.HOST2}`
    : `${process.env.HOST}`; //private field
const user =
  `${process.env.NODE_ENV}` === "dev"
    ? `${process.env.DBUSER2}`
    : `${process.env.DBUSER}`; //private field
const pass =
  `${process.env.NODE_ENV}` === "dev"
    ? `${process.env.PASS2}`
    : `${process.env.PASS}`; //private field
const database =
  `${process.env.NODE_ENV}` === "dev"
    ? `${process.env.DB2}`
    : `${process.env.DB}`; //private field

console.log(host, user, pass, database);

//database: database connection via pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: host,
  user: user,
  password: pass,
  database: database,
});

module.exports = pool.promise();
