const Model = require("../models/Model");
const moment = require("moment/moment");
const { toUpperCase, cleanString } = require("../utils/utils");
const { check, validationResult } = require("express-validator");

// exports.AllReports = async (req, res, next) => {
//   try {
//     const [reports] = await Model.findById(
//       "products",
//       "id,product_name,category_id,product_description,publisher_name,price,pub_date,is_active",
//       "is_deleted = 0 AND is_active = 1",
//       "id DESC"
//     );

//     res.status(200).json(reports);
//   } catch (err) {
//     return res.status(500).json({
//       error: err.message,
//     });
//   }
// };

exports.AllReports = async (req, res, next) => {
  const start = req.query.start || 0;
  const limit = req.query.limit || 10;
  try {
    const [reports] = await Model.findById(
      "products p,product_categories pc",
      "p.id,p.product_name,p.category_id,p.product_description,p.publisher_name,p.price,p.pub_date,p.slug,p.is_active",
      `p.id = pc.product_id AND p.is_deleted = 0 AND p.is_active = 1`,
      `p.id DESC LIMIT ${start},${limit}`
    );
    const [c] = await Model.findById(
      "products p,product_categories pc",
      "*",
      `p.id = pc.product_id AND p.is_deleted = 0 AND p.is_active = 1`,
      "p.id DESC"
    );
    const count = c.length;

    // const [reports] = await Model.limitedProducts(start, limit);
    // const [c] = await Model.AllProducts();
    // const count = c.length;
    res.status(200).json({ reports, count });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.AllCategories = async (req, res, next) => {
  try {
    const [arr] = await Model.findById(
      "categories",
      "id,category_name,parent_category_id,is_active",
      "parent_category_id = 2",
      "category_name ASC"
    );
    let categories = [];

    for (i = 0; i < arr.length; i++) {
      const [total] = await Model.findById(
        "product_categories pc",
        "pc.*",
        `category_id=${arr[i].id}`,
        "pc.id ASC"
      );
      const reports = total.length;
      const [child] = await Model.findById(
        "categories",
        "id,category_name,parent_category_id,is_active",
        `parent_category_id = ${arr[i].id}`,
        "category_name ASC"
      );

      let obj = {
        id: arr[i].id,
        name: arr[i].category_name,
        status: arr[i].is_active,
        children: [],
        reports: reports,
      };

      for (j = 0; j < child.length; j++) {
        const [t] = await Model.findById(
          "product_categories pc",
          "pc.*",
          `category_id=${arr[j].id}`,
          "pc.id ASC"
        );
        const all = t.length;
        let childObj = {
          id: child[j].id,
          name: child[j].category_name,
          is_active: child[j].is_active,
          reports: all,
        };
        obj.children.push(childObj);
      }
      categories.push(obj);
    }

    res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getReport = async (req, res, next) => {
  // console.log(req);
  const slug = req.params.slug;
  // console.log(slug);

  try {
    const [report] = await Model.getOne(
      "products p,categories c",
      "p.*,c.category_name",
      `p.category_id = c.id AND p.slug='${slug}'`
    );
    console.log(report[0]);
    res.status(200).json(report[0]);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getCategoryReports = async (req, res, next) => {
  const id = req.params.id;
  const start = req.query.start || 0;
  const limit = req.query.limit || 10;
  try {
    const [reports] = await Model.findById(
      "products p,product_categories pc",
      "p.id,p.product_name,p.category_id,p.product_description,p.publisher_name,p.price,p.pub_date,p.slug,p.is_active",
      `pc.category_id=${id} AND p.id = pc.product_id AND p.is_deleted = 0 AND p.is_active = 1`,
      `p.id DESC LIMIT ${start},${limit}`
    );

    const [c] = await Model.findById(
      "products p,product_categories pc",
      "p.*",
      `pc.category_id=${id} AND p.id = pc.product_id AND p.is_deleted = 0 AND p.is_active = 1`,
      "p.id DESC"
    );
    const count = c.length;

    res.status(200).json({ reports, count });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getSearchReports = async (req, res, next) => {
  const name = req.query.name;
  console.log(req);
  console.log(name);

  try {
    const [reports] = await Model.searchReport(name);

    res.status(201).json(reports);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getLatestReports = async (req, res, next) => {
  const start = req.query.start || 0;
  const limit = req.query.limit || 3;
  try {
    const [reports] = await Model.findById(
      "products",
      "id,product_name,category_id,product_description,publisher_name,price,pub_date,is_active",
      `is_deleted = 0 AND is_active = 1`,
      `id DESC LIMIT ${start},${limit}`
    );

    res.status(200).json(reports);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getLatestArticles = async (req, res, next) => {
  const start = req.query.start || 0;
  const limit = req.query.limit || 3;
  try {
    const [articles] = await Model.fetchAll(
      "articles",
      "id,headline,article_type,description,category_id,slug",
      `id DESC LIMIT ${start},${limit}`
    );

    res.status(200).json(articles);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.AllTestimonials = async (req, res, next) => {
  try {
    const [testimonials] = await Model.fetchAll(
      "testimonials",
      "id,testimonial_title,testimonial_description,is_active",
      "id DESC"
    );

    res.status(200).json(testimonials);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
