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
    return db.execute(
      `SELECT ${field} FROM ${table} WHERE ${con} ORDER BY ${order}`
    );
  }

  static addData(table, field = "*", value) {
    return db.execute(`INSERT INTO ${table} ${field} VALUES ${value}`);
  }

  static editData(table, obj, id) {
    console.log(`UPDATE ${table} SET ${obj} WHERE id = ${id}`);
    return db.execute(`UPDATE ${table} SET ${obj} WHERE id = ${id}`);
  }

  // status change
  static softDelete(table, obj, id) {
    console.log(`UPDATE ${table} SET ${obj} WHERE id = ${id}`);
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

  static findReport(name, price, status, reseller, category_id) {
    console.log(name);

    return db.execute(
      `SELECT * FROM products WHERE product_name LIKE '${name}%' AND price LIKE '${price}%' AND is_active LIKE '${status}%' AND share_with_reseller LIKE '${reseller}%' AND category_id LIKE '${category_id}%'`
    );
  }
};
