const Admin = require("../models/Model");
const md5 = require("md5");
const moment = require("moment/moment");
const { toUpperCase } = require("../utils/utils");

exports.AllUser = async (req, res, next) => {
  try {
    const [users] = await Admin.fetchAll("users", "id,first_name,last_name");
    res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const [user] = await Admin.getOne("users", "id,first_name,last_name", 2);
    res.status(200).json(user[0]);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.addData = async (req, res, next) => {
  const first_name = req.body.firstName;
  const last_name = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  var created = moment(new Date()).format("YYYY-MM-D H:MM:SS");

  const value = `("${toUpperCase(first_name)}", "${toUpperCase(
    last_name
  )}", "${email}", "${md5(password)}", "${role}", "${created}", "${created}")`;

  try {
    const [user] = await Admin.addData(
      "users",
      "(first_name, last_name, email, password, role,created,modified)",
      value
    );
    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
