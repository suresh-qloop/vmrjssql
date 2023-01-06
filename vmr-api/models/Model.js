require("dotenv").config();

const db = require("./config");

module.exports = class Model {
  static fetchAll(table, field = "*", order) {
    return db.execute(`SELECT ${field} FROM ${table} ORDER BY ${order}`);
  }

  static getOne(table, field = "*", con) {
    return db.execute(`SELECT ${field} FROM ${table} WHERE ${con}`);
  }

  static findById(table, field = "*", con, order) {
    console.log(`SELECT ${field} FROM ${table} WHERE ${con} ORDER BY ${order}`);
    return db.execute(
      `SELECT ${field} FROM ${table} WHERE ${con} ORDER BY ${order}`
    );
  }

  static addData(table, field = "*", value) {
    console.log(`INSERT INTO ${table} ${field} VALUES ${value}`);
    return db.execute(`INSERT INTO ${table} ${field} VALUES ${value}`);
  }

  static editData(table, obj, id) {
    return db.execute(`UPDATE ${table} SET ${obj} WHERE id = ${id}`);
  }

  static edit(table, obj, con) {
    return db.execute(`UPDATE ${table} SET ${obj} WHERE ${con}`);
  }

  // status change
  static softDelete(table, obj, id) {
    return db.execute(`UPDATE ${table} SET ${obj} WHERE id = ${id}`);
  }

  // permanent delete
  static hardDelete(table, con) {
    return db.execute(`DELETE FROM ${table} WHERE ${con}`);
  }

  static findByJoin(table1, obj, table2, con1, con2) {
    return db.execute(
      `SELECT ${obj} FROM ${table1} INNER JOIN ${table2} ON ${con1} WHERE ${con2}`
    );
  }
};
