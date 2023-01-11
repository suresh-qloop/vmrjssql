const Enquirie = require("../models/Model");
const moment = require("moment/moment");
const { toUpperCase } = require("../utils/utils");
const { check, validationResult } = require("express-validator");

exports.AllEnquiries = async (req, res, next) => {
  const field = `e.id,e.subject,e.message,e.status,e.rating,e.remark,e.next_followup_date,e.is_active,e.is_verified,e.visited_ip,e.ref_page,
    u.first_name,u.last_name,u.email,u.role,u.organisation,u.job_title,u.country,
    p.product_name,p.publisher_name`;
  try {
    const [enquiries] = await Enquirie.findById(
      "enquiries e,users u,products p",
      field,
      "e.user_id = u.id AND e.product_id = p.id",
      "e.id DESC"
    );
    // console.log(enquiries);
    return res.status(201).json(enquiries);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.enquirieStatus = async (req, res, next) => {
  const id = req.params.id;
  const status = req.body.status;
  console.log(status);

  try {
    // const [enquirie] = await Enquirie.getOne("enquiries", "status", `id=${id}`);
    if (status) {
      if (status == "0") {
        obj = "status = 0";
      }
      if (status == "1") {
        obj = "status = 1";
      }
      if (status == "2") {
        obj = "status = 2";
      }
      if (status == "3") {
        obj = `status = 3`;
      }
      if (status == "4") {
        obj = "status = 4";
      }
      if (status == "5") {
        obj = "status = 5";
      }
      if (status == "6") {
        obj = "status = 6";
      }
      console.log(obj);
      const [sql] = await Enquirie.editData("enquiries", obj, id);
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

exports.enquirieRating = async (req, res, next) => {
  const id = req.params.id;
  const rating = req.body.rating;

  try {
    if (rating) {
      if (rating == "0") {
        obj = "rating = 0";
      }
      if (rating == "1") {
        obj = "rating = 1";
      }
      if (rating == "2") {
        obj = "rating = 2";
      }
      if (rating == "3") {
        obj = `rating = 3`;
      }
      if (rating == "4") {
        obj = "rating = 4";
      }

      const [sql] = await Enquirie.editData("enquiries", obj, id);
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
