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
