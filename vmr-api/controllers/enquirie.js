const Enquirie = require("../models/Model");
const moment = require("moment/moment");
const { toUpperCase } = require("../utils/utils");
const { check, validationResult } = require("express-validator");

exports.AllEnquiries = async (req, res, next) => {
  const field = `e.id,e.subject,e.message,e.status,e.rating,e.remark,e.next_followup_date,e.is_active,e.is_verified,e.visited_ip,e.ref_page,e.created,
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

exports.enquirieFilters = async (req, res, next) => {
  const filterRatting = req.query.ratting;
  const filterStatus = req.query.filterStatus;
  const productName = req.query.productName;
  const createDate = req.query.createDate;
  const createDateCheck = req.query.createDateCheck;
  let ratting = [];
  let status = [];
  if (filterRatting) {
    ratting = filterRatting.split(",");
  }
  if (filterStatus) {
    status = filterStatus.split(",");
  }
  // console.log(ratting);
  // console.log(status);
  // console.log(productName);
  // console.log(createDate);

  try {
    let rattingObj = ``;
    let statusObj = ``;
    let idx = 0;
    let idx2 = 0;

    if (ratting) {
      for (let i = 0; i < ratting.length; i++) {
        if (idx == 0) {
          rattingObj += `e.rating = ${ratting[i]}`;
          idx++;
        } else {
          rattingObj += ` OR e.rating = ${ratting[i]}`;
        }
      }
    }
    if (status) {
      for (let j = 0; j < status.length; j++) {
        if (idx2 == 0) {
          statusObj += `e.status = ${status[j]}`;
          idx2++;
        } else {
          statusObj += ` OR e.status = ${status[j]}`;
        }
      }
    }
    console.log(rattingObj);
    console.log(statusObj);
    let obj = ` e.user_id = u.id AND e.product_id = p.id`;
    if (rattingObj) {
      obj += ` AND `;
      obj += rattingObj;
    }
    if (statusObj) {
      obj += ` AND `;
      obj += statusObj;
    }
    console.log(productName);
    if (productName && productName !== "undefined") {
      obj += ` AND p.product_name LIKE '%${productName}%' `;
    }
    console.log(createDate);
    console.log(createDateCheck);
    // if (createDate) {
    if (createDateCheck === "true") {
      obj += ` AND e.created LIKE '%${createDate}%'`;
    }
    // }
    console.log(obj);

    // const [sql] = await Enquirie.editData("enquiries", obj, id);
    const [enquiries] = await Enquirie.findById(
      "enquiries e,users u,products p",
      `e.id,e.subject,e.message,e.status,e.rating,e.remark,e.next_followup_date,e.is_active,e.is_verified,e.visited_ip,e.ref_page,e.created,
      u.first_name,u.last_name,u.email,u.role,u.organisation,u.job_title,u.country,
      p.product_name,p.publisher_name`,
      obj,
      "e.id DESC"
    );
    return res.status(201).json(enquiries);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getCSVData = async (req, res, next) => {
  const field = `e.id,e.subject,e.message,e.status,e.rating,e.remark,e.next_followup_date,e.is_active,e.is_verified,e.visited_ip,e.ref_page,e.created,
    u.first_name,u.last_name,u.email,u.role,u.organisation,u.job_title,u.country,
    p.product_name,p.publisher_name`;
  let data;
  try {
    const [enquiries] = await Enquirie.findById(
      "enquiries e,users u,products p",
      field,
      `e.user_id = u.id AND e.product_id = p.id AND e.created >= DATE(NOW() - INTERVAL 7 DAY)`,
      "e.id DESC"
    );
    enquiries.map((enquire) => {
      if (enquire.status == 0) {
        enquire.status = "No Status";
      }
      if (enquire.status == 1) {
        enquire.status = "Closed";
      }
      if (enquire.status == 2) {
        enquire.status = "Waiting";
      }
      if (enquire.status == 3) {
        enquire.status = "DnD";
      }
      if (enquire.status == 4) {
        enquire.status = "Not Interested";
      }
      if (enquire.status == 5) {
        enquire.status = "Junk";
      }
      if (enquire.status == 6) {
        enquire.status = "Lost";
      }

      if (enquire.rating == 0) {
        enquire.rating = "No Status";
      }
      if (enquire.rating == 1) {
        enquire.rating = "Hot";
      }
      if (enquire.rating == 2) {
        enquire.rating = "Warm";
      }
      if (enquire.rating == 3) {
        enquire.rating = "Cold";
      }
      if (enquire.rating == 4) {
        enquire.rating = "Very Hot";
      }
      enquire.created = moment(enquire.created)
        .format()
        .slice(0, 19)
        .replace("T", " ");
    });
    console.log(enquiries, "ddd");
    return res.status(201).json(enquiries);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
