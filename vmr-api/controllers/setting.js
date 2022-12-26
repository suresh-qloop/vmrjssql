const Settings = require("../models/Model");
const moment = require("moment/moment");
const { toUpperCase } = require("../utils/utils");
const { check, validationResult } = require("express-validator");

exports.AllSettings = async (req, res, next) => {
  try {
    const [settings] = await Settings.fetchAll("settings", "*", "id DESC");

    return res.status(201).json(settings);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getSetting = async (req, res, next) => {
  const id = req.params.id;
  try {
    const [setting] = await Settings.findById(
      "settings",
      "*",
      `id=${id}`,
      "id DESC"
    );

    return res.status(201).json(setting[0]);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.addSetting = async (req, res, next) => {
  await check("key").notEmpty().run(req);
  await check("value").notEmpty().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  const key = req.body.key;
  const value = req.body.value;
  let date = moment(new Date()).format("YYYY-MM-DD HH:MM:SS");
  try {
    const field = "(`key`,`value`,modified)";
    const val = `('${key}', '${value}','${date}')`;

    const [settings] = await Settings.addData("settings", field, val);

    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.editSetting = async (req, res, next) => {
  await check("key").notEmpty().run(req);
  await check("value").notEmpty().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  const id = req.params.id;
  const key = req.body.key;
  const value = req.body.value;

  try {
    const obj = `\`key\`="${key}",\`value\`="${value}"`;

    const [setting] = await Settings.editData("settings", obj, id);

    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
