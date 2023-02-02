const Category = require("../models/Model");
const moment = require("moment/moment");
const { toUpperCase, cleanString } = require("../utils/utils");
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
        is_active: arr[i].is_active,
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
      "id,category_name,short_desc,long_desc",
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
  await check("short_desc").notEmpty().run(req);
  await check("long_desc").notEmpty().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  const category_name = toUpperCase(req.body.category_name);
  const short_desc = toUpperCase(req.body.short_desc);
  const long_desc = toUpperCase(req.body.long_desc);
  const slug = cleanString(category_name);

  let date = moment().format().slice(0, 19).replace("T", " ");

  try {
    const value = `("${category_name}","${short_desc}","${long_desc}","2", "2","${slug}","${date}")`;
    const [category] = await Category.addData(
      "categories",
      "(category_name,short_desc,long_desc,parent_category_id,level,modified)",
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
  await check("short_desc").notEmpty().run(req);
  await check("long_desc").notEmpty().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  const id = req.params.id;
  const category_name = toUpperCase(req.body.category_name);
  const short_desc = toUpperCase(req.body.short_desc);
  const long_desc = toUpperCase(req.body.long_desc);
  const slug = cleanString(category_name);

  try {
    const obj = `category_name="${category_name}",short_desc="${short_desc}",long_desc="${long_desc}",slug="${slug}"`;

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
        is_active: arr[i].is_active,
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
  await check("short_desc").notEmpty().run(req);
  await check("long_desc").notEmpty().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  const parent_category_id = req.params.id;
  const category_name = toUpperCase(req.body.category_name);
  const short_desc = toUpperCase(req.body.short_desc);
  const long_desc = toUpperCase(req.body.long_desc);
  const slug = cleanString(category_name);
  let created = moment().format().slice(0, 19).replace("T", " ");

  try {
    const value = `("${category_name}","${short_desc}","${long_desc}","${parent_category_id}", "3","${slug}","${created}", "${created}")`;
    const [category] = await Category.addData(
      "categories",
      "(category_name,short_desc,long_desc,parent_category_id,level,created,modified)",
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

    // for (i = 0; i < arr.length; i++) {
    //   const [child] = await Category.findById(
    //     "categories",
    //     "id,category_name,parent_category_id,is_active",
    //     `parent_category_id = ${arr[i].id}`,
    //     "category_name ASC"
    //   );
    //   let obj = {
    //     id: arr[i].id,
    //     name: arr[i].category_name,
    //     status: arr[i].is_active,
    //     children: child,
    //   };
    //   categories.push(obj);
    // }

    await Promise.all(
      arr.map(async (item) => {
        const [total] = await Category.findById(
          "product_categories pc",
          "pc.*",
          `category_id=${item.id}`,
          "pc.id ASC"
        );
        let reports = total.length;

        let [child] = await Category.findById(
          "categories",
          "id,category_name,parent_category_id,is_active",
          `parent_category_id = ${item.id}`,
          "category_name ASC"
        );

        let obj = {
          id: item.id,
          name: item.category_name,
          status: item.is_active,
          children: [],
          reports: reports,
        };
        await Promise.all(
          child.map(async (child, i) => {
            const [t] = await Category.findById(
              "product_categories pc",
              "pc.*",
              `category_id=${child.id}`,
              "pc.id ASC"
            );
            const all = t.length;
            let childObj = {
              id: child.id,
              name: child.category_name,
              is_active: child.is_active,
              reports: all,
            };
            return obj.children.push(childObj);
          })
        );
        return categories.push(obj);
      })
    );

    categories.sort((a, b) => a.name.localeCompare(b.name));
    res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
