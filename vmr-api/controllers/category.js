const Category = require("../models/Model");
const moment = require("moment/moment");
const { toUpperCase } = require("../utils/utils");
const { check, validationResult } = require("express-validator");

exports.AllCategory = async (req, res, next) => {
  try {
    const [arr] = await Category.findById(
      "categories",
      "id,category_name,parent_category_id,is_active",
      "parent_category_id = 2",
      "category_name ASC"
    );

    let categories = [];

    for (i = 0; i < arr.length; i++) {
      let obj = {
        id: arr[i].id,
        name: arr[i].category_name,
        status: arr[i].is_active,
      };
      categories.push(obj);
    }

    res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getCategory = async (req, res, next) => {
  const id = req.params.id;
  try {
    const [category] = await Category.getOne(
      "categories",
      "id,category_name",
      `id=${id} ORDER BY category_name ASC`
    );
    res.status(200).json(category[0]);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.addCategory = async (req, res, next) => {
  await check("category_name").notEmpty().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  const category_name = toUpperCase(req.body.category_name);

  let created = moment(new Date()).format("YYYY-MM-D H:MM:SS");

  try {
    const value = `("${category_name}", "2", "2","${created}", "${created}")`;
    const [category] = await Category.addData(
      "categories",
      "(category_name,parent_category_id,level,created,modified)",
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

exports.editCategory = async (req, res, next) => {
  await check("category_name").notEmpty().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  const id = req.params.id;
  const category_name = toUpperCase(req.body.category_name);

  try {
    const obj = `category_name="${category_name}"`;

    const [category] = await Category.editData("categories", obj, id);

    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.deleteCategory = async (req, res, next) => {
  const id = req.params.id;
  try {
    const [category] = await Category.hardDelete("categories", `id=${id}`);
    const [child] = await Category.hardDelete(
      "categories",
      `parent_category_id=${id}`
    );
    const [report] = await Category.hardDelete(
      "product_categories",
      `category_id=${id}`
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

exports.categoryStatus = async (req, res, next) => {
  const id = req.params.id;

  try {
    const [category] = await Category.getOne(
      "categories",
      "is_active",
      `id=${id}`
    );

    if (category[0].is_active === 0) {
      obj = `is_active = 1`;
      const [sql] = await Category.editData("categories", obj, id);
      return res.status(201).json({
        message: "success",
      });
    }
    if (category[0].is_active === 1) {
      obj2 = `is_active = 0`;
      const [sql2] = await Category.editData("categories", obj2, id);
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

exports.AllChildCategory = async (req, res, next) => {
  const id = req.params.id;
  try {
    const [arr] = await Category.findById(
      "categories",
      "id,category_name,parent_category_id,is_active",
      `parent_category_id = ${id}`,
      "category_name ASC"
    );

    let categories = [];

    for (i = 0; i < arr.length; i++) {
      let obj = {
        id: arr[i].id,
        name: arr[i].category_name,
        status: arr[i].is_active,
      };
      categories.push(obj);
    }

    res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.addChildCategory = async (req, res, next) => {
  await check("category_name").notEmpty().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  const parent_category_id = req.params.id;
  const category_name = toUpperCase(req.body.category_name);

  let created = moment(new Date()).format("YYYY-MM-D H:MM:SS");

  try {
    const value = `("${category_name}", "${parent_category_id}", "3","${created}", "${created}")`;
    const [category] = await Category.addData(
      "categories",
      "(category_name,parent_category_id,level,created,modified)",
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

exports.deleteChildCategory = async (req, res, next) => {
  const id = req.params.id;
  try {
    const [category] = await Category.hardDelete("categories", `id=${id}`);

    const [report] = await Category.hardDelete(
      "product_categories",
      `category_id=${id}`
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

exports.dropListCategory = async (req, res, next) => {
  try {
    const [arr] = await Category.findById(
      "categories",
      "id,category_name,parent_category_id,is_active",
      "parent_category_id = 2",
      "category_name ASC"
    );
    let categories = [];

    for (i = 0; i < arr.length; i++) {
      const [child] = await Category.findById(
        "categories",
        "id,category_name,parent_category_id,is_active",
        `parent_category_id = ${arr[i].id}`,
        "category_name ASC"
      );
      let obj = {
        id: arr[i].id,
        name: arr[i].category_name,
        status: arr[i].is_active,
        children: child,
      };
      categories.push(obj);
    }

    res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
