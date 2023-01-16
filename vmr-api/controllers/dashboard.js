const Enquirie = require("../models/Model");
const moment = require("moment/moment");
const { toUpperCase } = require("../utils/utils");
const { check, validationResult } = require("express-validator");

exports.EnquiriesCount = async (req, res, next) => {
  try {
    const [sql1] = await Enquirie.findById(
      "enquiries e",
      "*",
      `e.created >= DATE(NOW() - INTERVAL 0 DAY)`,
      "e.id DESC"
    );
    const Todays = sql1.length;
    const [sql2] = await Enquirie.findById(
      "enquiries e",
      "*",
      "e.created >= DATE(NOW() - INTERVAL 7 DAY)",
      "e.id DESC"
    );
    const sevenDays = sql2.length;
    const [sql3] = await Enquirie.findById(
      "enquiries e",
      "*",
      "e.created >= DATE(NOW() - INTERVAL 30 DAY)",
      "e.id DESC"
    );
    const thirtyDays = sql3.length;
    let data = {
      sevenDays: sevenDays,
      todays: Todays,
      thirtyDays: thirtyDays,
    };
    return res.status(201).json(data);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
