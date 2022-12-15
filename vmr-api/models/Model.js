require("dotenv").config();

const db = require("./config");
// const Define = require("../utils/Define");

module.exports = class Model {
  //mysql config

  static fetchAll(table, field = "*", order) {
    return db.execute(`SELECT ${field} FROM ${table} ORDER BY ${order}`);
  }

  static getOne(table, field = "*", con) {
    return db.execute(`SELECT ${field} FROM ${table} WHERE ${con}`);
  }

  static addData(table, field = "*", value) {
    return db.execute(`INSERT INTO ${table} ${field} VALUES ${value}`);
  }

  static editData(table, obj, id) {
    return db.execute(`UPDATE ${table} SET ${obj} WHERE id = ${id}`);
  }

  // status change
  static softDelete(table, obj, id) {
    return db.execute(`UPDATE ${table} SET ${obj} WHERE id = ${id}`);
  }

  // permanent delete
  static hardDelete(table, id) {
    return db.execute(`DELETE FROM ${table} WHERE id = ${id}`);
  }
};
