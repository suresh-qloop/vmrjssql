const Admin = require("../models/Model");
const md5 = require("md5");
const moment = require("moment/moment");
const { toUpperCase } = require("../utils/utils");

exports.AllUser = async (req, res, next) => {
  try {
    const [users] = await Admin.fetchAll(
      "users",
      "id,first_name,last_name,email,last_login,role,is_active",
      "id DESC"
    );
    res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const [user] = await Admin.getOne(
      "users",
      "id,first_name,last_name,email,is_active",
      `id=${id}`
    );
    res.status(200).json(user[0]);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.addUser = async (req, res, next) => {
  const first_name = toUpperCase(req.body.firstName);
  const last_name = toUpperCase(req.body.lastName);
  const email = req.body.email;
  const password = md5(req.body.password);
  const role = req.body.role;
  var created = moment(new Date()).format("YYYY-MM-D H:MM:SS");

  try {
    const [email_check] = await Admin.getOne("users", "*", `email='${email}'`);

    if (email_check.length > 0) {
      res.status(500).json({
        message: "E-mail exists already",
      });
    }

    const value = `("${first_name}", "${last_name}", "${email}", "${password}", "${role}", "${created}", "${created}")`;
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

exports.editUser = async (req, res, next) => {
  console.log(req.body);
  const id = req.params.id;
  const first_name = toUpperCase(req.body.first_name);
  const last_name = toUpperCase(req.body.last_name);
  let password = req.body.password;
  const role = req.body.role;

  try {
    if (password === "") {
      console.log("without");
      const obj = `first_name="${first_name}",last_name="${last_name}",role="${role}"`;

      const [user] = await Admin.editData("users", obj, id);
      res.status(200).json({
        message: "success",
      });
    } else {
      console.log("with");
      const obj2 = `first_name="${first_name}",last_name="${last_name}",password="${password}",role="${role}"`;

      const [user2] = await Admin.editData("users", obj2, id);
      res.status(200).json({
        message: "success",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const [user] = await Admin.hardDelete("users", id);
    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.changeUserPassword = async (req, res, next) => {
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;
  try {
    const [user] = await Admin.getOne("users", "*", `id=${req.userId}`);

    const md5password = md5(oldPassword);
    if (md5password !== user.password) {
      return res.status(401).json({
        error: "Old password Wrong",
      });
    }
    if (newPassword === confirmPassword) {
      const password = md5(newPassword);
      obj = `password="${password}"`;
      const [psw] = await Admin.editData("users", obj, req.userId);
      return res.status(201).json({
        message: "success",
      });
    } else {
      return res.status(401).json({
        error: "New Password and Confirm Password doesn't Match",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.resetUserPassword = async (req, res, next) => {
  const id = req.params.id;
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;
  try {
    if (newPassword === confirmPassword) {
      const password = md5(newPassword);
      obj = `password="${password}"`;
      const [psw] = await Admin.editData("users", obj, id);
      return res.status(201).json({
        message: "success",
      });
    } else {
      return res.status(401).json({
        error: "New Password and Confirm Password doesn't Match",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.userStatus = async (req, res, next) => {
  const id = req.params.id;

  try {
    const [user] = await Admin.getOne("users", "is_active", `id=${id}`);

    if (user[0].is_active === 0) {
      obj = `is_active = 1`;
      const [sql] = await Admin.editData("users", obj, id);
      return res.status(201).json({
        message: "success",
      });
    }
    if (user[0].is_active === 1) {
      obj2 = `is_active = 0`;
      const [sql2] = await Admin.editData("users", obj2, id);
      return res.status(201).json({
        message: "success",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
