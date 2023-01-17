const Admin = require("../models/Model");
const md5 = require("md5");
const moment = require("moment/moment");
const { toUpperCase } = require("../utils/utils");
const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

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
      "id,first_name,last_name,email,role,is_active",
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
  await check("first_name").notEmpty().run(req);
  await check("last_name").notEmpty().run(req);
  await check("email").notEmpty().run(req);
  await check("password").notEmpty().run(req);
  await check("role").notEmpty().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  const first_name = toUpperCase(req.body.first_name);
  const last_name = toUpperCase(req.body.last_name);
  const email = req.body.email;
  const password = md5(req.body.password);
  const role = req.body.role;
  let date = moment().format().slice(0, 19).replace("T", " ");

  try {
    const [email_check] = await Admin.getOne("users", "*", `email='${email}'`);

    if (email_check.length > 0) {
      return res.status(500).json({
        message: "E-mail exists already",
      });
    }

    const value = `("${first_name}", "${last_name}", "${email}", "${password}", "${role}", "${date}")`;
    const [user] = await Admin.addData(
      "users",
      "(first_name, last_name, email, password, role,modified)",
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
  await check("first_name").notEmpty().run(req);
  await check("last_name").notEmpty().run(req);
  if (!(req.body.password === "")) {
    await check("password").notEmpty().isLength({ min: 6 }).run(req);
  }
  await check("role").notEmpty().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  const id = req.params.id;
  const first_name = toUpperCase(req.body.first_name);
  const last_name = toUpperCase(req.body.last_name);
  let password = req.body.password;
  const role = req.body.role;

  try {
    if (password === "") {
      const obj = `first_name="${first_name}",last_name="${last_name}",role="${role}"`;

      const [user] = await Admin.editData("users", obj, id);
      res.status(200).json({
        message: "success",
      });
    } else {
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
    const [user] = await Admin.hardDelete("users", `id=${id}`);
    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  await check("email").notEmpty().run(req);
  await check("password").notEmpty().run(req);
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  const email = req.body.email;
  const password = req.body.password;
  let last_login = moment().format().slice(0, 19).replace("T", " ");

  let loadedUser;

  try {
    const [user] = await Admin.getOne("users", "*", `email='${email}'`);

    if (user.length < 0) {
      return res.status(500).json({ error: "User not found." });
    }

    loadedUser = await user[0];

    const md5password = md5(password);
    if (md5password !== loadedUser.password) {
      return res.status(401).json({
        error: "Wrong password",
      });
    }

    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser.id,
      },
      SECRET,
      { expiresIn: "24h" }
      // 120000
    );

    const obj = `last_login="${last_login}"`;
    const [lastLogin] = await Admin.editData("users", obj, loadedUser.id);
    const jwtPayload = JSON.parse(Buffer.from(token.split(".")[1], "base64"));
    const expTime = jwtPayload.exp;

    res.status(200).json({
      token: token,
      userId: loadedUser.id,
      role: loadedUser.role,
      expTime: expTime,
      message: "success",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.changeUserPassword = async (req, res, next) => {
  await check("oldPassword").notEmpty().run(req);
  await check("newPassword").notEmpty().run(req);
  await check("confirmPassword").notEmpty().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

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
  await check("newPassword").notEmpty().run(req);
  await check("confirmPassword").notEmpty().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

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
