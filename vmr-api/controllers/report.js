const Report = require("../models/Model");
const moment = require("moment/moment");
const { toUpperCase, cleanString } = require("../utils/utils");
const { check, validationResult } = require("express-validator");

exports.AllReports = async (req, res, next) => {
  try {
    const [reports] = await Report.findById(
      "products",
      "id,product_name,publisher_name,meta_name,meta_desc,meta_keywords,price,is_active",
      "is_deleted = 0",
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
  // const obj = `products.id,products.product_name,products.alias,products.product_no,products.product_description,products.product_image,products.product_specification,products.price,products.corporate_price,products.upto10,products.data_pack_price,products.dollar_price,products.is_active,products.meta_name,products.meta_keywords,products.meta_desc,products.publisher_name,products.share_with_reseller,products.pub_date,products.is_upcoming,products.created,products.modified,categories.category_name`;
  // const con1 = `products.category_id = categories.id`;
  // const con2 = `products.id=${id}`;
  try {
    // const [report] = await Report.findByJoin(
    //   "products",
    //   obj,
    //   "categories",
    //   con1,
    //   con2
    // );
    const obj =
      "product_name,alias,publisher_name,is_set_toc,category_id,product_description,product_specification,price,upto10,corporate_price,data_pack_price,pub_date,meta_name,meta_keywords,meta_desc,product_faq,slug,share_with_reseller,is_upcoming";
    const [report] = await Report.getOne("products", obj, `id=${id}`);
    res.status(200).json(report[0]);
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

exports.addReport = async (req, res, next) => {
  await check("product_name").notEmpty().run(req);
  await check("alias").notEmpty().run(req);
  await check("publisher_name").notEmpty().run(req);
  await check("category_id").notEmpty().run(req);
  await check("TOC").notEmpty().run(req);
  await check("description").notEmpty().run(req);
  await check("price").notEmpty().run(req);
  await check("corporate_price").notEmpty().run(req);
  await check("upto10").notEmpty().run(req);
  await check("data_pack_price").notEmpty().run(req);
  await check("pub_date").notEmpty().run(req);
  await check("meta_name").notEmpty().run(req);
  await check("meta_keywords").notEmpty().run(req);
  await check("meta_desc").notEmpty().run(req);
  console.log(req);
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  // let is_set_toc;
  // let share_with_reseller;

  const product_name = toUpperCase(req.body.product_name);
  const alias = toUpperCase(req.body.alias);
  const publisher_name = req.body.publisher_name;
  const is_set_toc = req.body.is_set_toc ? 1 : 0;
  // if (req.body.is_set_toc == "true") {
  //   is_set_toc = 1;
  // } else {
  //   is_set_toc = 0;
  // }
  const category_id = req.body.category_id;
  const product_description = req.body.description;
  const product_specification = req.body.TOC;

  const price = req.body.price;
  const upto10 = req.body.upto10;
  const corporate_price = req.body.corporate_price;
  const data_pack_price = req.body.data_pack_price;
  const pub_date = req.body.pub_date;

  const meta_name = req.body.meta_name;
  const meta_keywords = req.body.meta_keywords;
  const meta_desc = req.body.meta_desc;

  const slug = cleanString(product_name);
  let modified = moment(new Date()).format("YYYY-MM-DD HH:MM:SS");
  const share_with_reseller = req.body.share_with_reseller ? 1 : 0;
  const is_upcoming = req.body.is_upcoming ? 1 : 0;
  // if (req.body.share_with_reseller === "true") {
  //   share_with_reseller = 1;
  // } else {
  //   share_with_reseller = 0;
  // }

  try {
    const field =
      "(product_name,alias,category_id,product_description,product_specification,is_set_toc,price,corporate_price,upto10,data_pack_price,pub_date,meta_name,meta_keywords,meta_desc,slug,publisher_name,modified,is_upcoming,share_with_reseller)";
    const value = `('${product_name}', '${alias}', '${category_id}', '${product_description}', '${product_specification}', '${is_set_toc}','${price}','${corporate_price}','${upto10}','${data_pack_price}','${pub_date}','${meta_name}','${meta_keywords}','${meta_desc}','${slug}','${publisher_name}','${modified}','${is_upcoming}','${share_with_reseller}')`;

    const [report] = await Report.addData("products", field, value);
    // console.log(report);
    // const report_no = `VMR1121${report.insertId}`;
    // const [product_no] = await Report.editData("products",,report)

    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.editReport = async (req, res, next) => {
  await check("product_name").notEmpty().run(req);
  await check("alias").notEmpty().run(req);
  await check("publisher_name").notEmpty().run(req);
  await check("category_id").notEmpty().run(req);
  await check("product_specification").notEmpty().run(req);
  await check("product_description").notEmpty().run(req);
  await check("price").notEmpty().run(req);
  await check("corporate_price").notEmpty().run(req);
  await check("upto10").notEmpty().run(req);
  await check("data_pack_price").notEmpty().run(req);
  await check("pub_date").notEmpty().run(req);
  await check("meta_name").notEmpty().run(req);
  await check("meta_keywords").notEmpty().run(req);
  await check("meta_desc").notEmpty().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  const id = req.params.id;
  const product_name = toUpperCase(req.body.product_name);
  const alias = toUpperCase(req.body.alias);
  const publisher_name = req.body.publisher_name;

  const is_set_toc = req.body.is_set_toc ? 1 : 0;

  const category_id = req.body.category_id;
  const product_description = req.body.product_description;
  const product_specification = req.body.product_specification;

  const price = req.body.price;
  const upto10 = req.body.upto10;
  const corporate_price = req.body.corporate_price;
  const data_pack_price = req.body.data_pack_price;

  const pub_date = moment(req.body.pub_date).format("YYYY-MM-DD HH:MM:SS");

  const meta_name = req.body.meta_name;
  const meta_keywords = req.body.meta_keywords;
  const meta_desc = req.body.meta_desc;

  const slug = cleanString(req.body.slug);
  let modified = moment(new Date()).format("YYYY-MM-DD HH:MM:SS");
  const share_with_reseller = req.body.share_with_reseller ? 1 : 0;
  const is_upcoming = req.body.is_upcoming ? 1 : 0;

  try {
    const obj = `product_name='${product_name}',alias='${alias}',category_id='${category_id}',product_description='${product_description}',product_specification='${product_specification}',is_set_toc='${is_set_toc}',price='${price}',corporate_price='${corporate_price}',upto10='${upto10}',data_pack_price='${data_pack_price}',pub_date='${pub_date}',meta_name='${meta_name}',meta_keywords='${meta_keywords}',meta_desc='${meta_desc}',publisher_name='${publisher_name}',modified='${modified}',is_upcoming='${is_upcoming}',share_with_reseller='${share_with_reseller}'`;

    const [products] = await Report.editData("products", obj, id);

    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.deleteReport = async (req, res, next) => {
  const id = req.params.id;
  try {
    const [report] = await Report.softDelete("products", "is_deleted = 1", id);
    res.status(200).json({
      message: "success",
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

    if (report[0].is_active === 0) {
      obj = `is_active = 1`;
      const [sql] = await Report.editData("products", obj, id);
      return res.status(201).json({
        message: "success",
      });
    }
    if (report[0].is_active === 1) {
      obj2 = `is_active = 0`;
      const [sql2] = await Report.editData("products", obj2, id);
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

exports.addReportFaqs = async (req, res, next) => {
  const id = req.params.id;
  const faqs = JSON.stringify(req.body.faqs);

  try {
    obj = `product_faq ='${faqs}'`;
    const [faq] = await Report.editData("products", obj, id);

    res.status(201).json({
      message: "success",
    });
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
  let reseller;
  if (req.query.reseller === "true") {
    reseller = 1;
  } else {
    reseller = 0;
  }
  // const reseller = req.query.reseller;
  const category_id = req.query.category_id;

  try {
    const [reports] = await Report.findReport(
      name,
      price,
      status,
      reseller,
      category_id
    );

    res.status(201).json(reports);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
