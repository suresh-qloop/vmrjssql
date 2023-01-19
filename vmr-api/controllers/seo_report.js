const Report = require("../models/Model");
const moment = require("moment/moment");
const { toUpperCase, cleanString } = require("../utils/utils");
const { check, validationResult } = require("express-validator");

exports.AllSEOReports = async (req, res, next) => {
  try {
    const [reports] = await Report.findById(
      "products",
      "id,product_name,meta_name,meta_desc,meta_keywords,is_active",
      "is_deleted = 0 AND is_Active = 1 OR is_Active = 2",
      "id DESC"
    );

    res.status(200).json(reports);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getReport = async (req, res, next) => {
  const id = req.params.id;

  try {
    const obj = "product_name,meta_name,meta_keywords,meta_desc";
    const [report] = await Report.getOne("products", obj, `id=${id}`);

    const [c] = await Report.findById(
      "product_categories",
      "*",
      `product_id=${id}`,
      "id DESC"
    );

    report[0].category_id = await c[0].category_id;
    res.status(200).json(report[0]);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.searchReport = async (req, res, next) => {
  const name = req.query.name;
  const price = req.query.price;
  const status = req.query.status;

  const category_id = req.query.category_id;

  try {
    let condition =
      "p.is_deleted = 0  AND (p.is_Active = 1 OR p.is_Active = 2)";
    let table = "products p";

    if (name) {
      condition += ` AND p.product_name LIKE '%${name}%'`;
    }

    if (price) {
      condition += ` AND p.price LIKE '${price}%'`;
    }

    if (status && status != 3) {
      condition += ` AND p.is_active=${status}`;
    }

    if (category_id && category_id != 3) {
      table += `, product_categories pc`;
      condition += ` AND p.id = pc.product_id AND pc.category_id=${category_id}`;
    }

    const [reports] = await Report.findById(
      table,
      "p.id,p.product_name,p.publisher_name,p.meta_name,p.meta_desc,p.meta_keywords,p.price,p.is_active",
      condition,
      "p.id DESC"
    );

    return res.status(200).json(reports);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getViewReport = async (req, res, next) => {
  const id = req.params.id;
  const obj = `products.id,products.product_name,products.alias,products.product_no,products.product_description,products.product_image,products.product_specification,products.price,products.corporate_price,products.upto10,products.data_pack_price,products.dollar_price,products.is_active,products.meta_name,products.meta_keywords,products.meta_desc,products.publisher_name,products.share_with_reseller,products.pub_date,products.is_upcoming,products.created,products.modified,categories.category_name`;
  const con1 = `products.category_id = categories.id`;
  const con2 = `products.id=${id}`;
  try {
    const [report] = await Report.findByJoin(
      "products",
      obj,
      "categories",
      con1,
      con2
    );

    res.status(200).json(report[0]);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.editReport = async (req, res, next) => {
  await check("meta_name").notEmpty().run(req);
  await check("meta_keywords").notEmpty().run(req);
  await check("meta_desc").notEmpty().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  const id = req.params.id;

  const meta_name = req.body.meta_name;
  const meta_keywords = req.body.meta_keywords;
  const meta_desc = req.body.meta_desc;

  let date = new Date().toISOString().slice(0, 19).replace("T", " ");

  try {
    const obj = `meta_name='${meta_name}',meta_keywords='${meta_keywords}',meta_desc='${meta_desc}',modified='${date}'`;

    const [products] = await Report.editData("products", obj, id);

    res.status(200).json({
      message: "success",
      id: id,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.reportStatus = async (req, res, next) => {
  const id = req.params.id;

  try {
    const [report] = await Report.getOne("products", "is_active", `id=${id}`);

    if (report[0].is_active === 2) {
      obj = `is_active = 1`;
      const [sql] = await Report.editData("products", obj, id);
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
