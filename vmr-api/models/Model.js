require("dotenv").config();

const db = require("./config");
// const Define = require("../utils/Define");

module.exports = class Model {
  //mysql config

  static fetchAll(table, field = "*") {
    return db.execute(`SELECT ${field} FROM ${table}`);
  }

  static getOne(table, field = "*", id) {
    return db.execute(`SELECT ${field} FROM ${table} WHERE id = ${id}`);
  }

  static addData(table, field = "*", value) {
    return db.execute(`INSERT INTO ${table} ${field} VALUES ${value}`);
  }
};
