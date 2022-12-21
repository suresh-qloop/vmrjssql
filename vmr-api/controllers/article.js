const Article = require("../models/Model");
const moment = require("moment/moment");
const { toUpperCase, cleanString } = require("../utils/utils");
const { check, validationResult } = require("express-validator");

exports.AllArticles = async (req, res, next) => {
  try {
    const [articles] = await Article.fetchAll(
      "articles",
      "id,headline,article_type,description,category_id,slug,meta_title,meta_desc,meta_keywords",
      "id DESC"
    );

    res.status(200).json(articles);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getArticle = async (req, res, next) => {
  const id = req.params.id;

  try {
    const obj =
      "id,headline,article_type,description,category_id,slug,meta_title,meta_desc,meta_keywords";
    const [article] = await Article.getOne("articles", obj, `id=${id}`);
    res.status(200).json(article[0]);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.addArticle = async (req, res, next) => {
  await check("headline").notEmpty().run(req);
  await check("article_type").notEmpty().run(req);
  await check("description").notEmpty().run(req);
  await check("meta_title").notEmpty().run(req);
  await check("meta_desc").notEmpty().run(req);
  await check("meta_keywords").notEmpty().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  const headline = toUpperCase(req.body.headline);
  const article_type = req.body.article_type;
  const description = req.body.description;
  const meta_title = req.body.meta_title;
  const meta_desc = req.body.meta_desc;
  const meta_keywords = req.body.meta_keywords;

  const slug = cleanString(headline);
  let modified = moment(new Date()).format("YYYY-MM-DD HH:MM:SS");

  try {
    const field =
      "(headline,article_type,description,category_id,slug,meta_title,meta_desc,meta_keywords,created,modified)";
    const value = `('${headline}', '${article_type}', '${description}', '2','${slug}', '${meta_title}', '${meta_desc}','${meta_keywords}','${modified}','${modified}')`;

    const [article] = await Article.addData("articles", field, value);

    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.editArticle = async (req, res, next) => {
  await check("headline").notEmpty().run(req);
  await check("article_type").notEmpty().run(req);
  await check("description").notEmpty().run(req);
  await check("category_id").notEmpty().run(req);
  await check("meta_title").notEmpty().run(req);
  await check("meta_desc").notEmpty().run(req);
  await check("meta_keywords").notEmpty().run(req);
  await check("slug").notEmpty().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  const id = req.params.id;
  const headline = toUpperCase(req.body.headline);
  const article_type = req.body.article_type;
  const description = req.body.description;
  const category_id = req.body.category_id;
  const meta_title = req.body.meta_title;
  const meta_desc = req.body.meta_desc;
  const meta_keywords = req.body.meta_keywords;

  const slug = cleanString(req.body.slug);
  let modified = moment(new Date()).format("YYYY-MM-DD HH:MM:SS");

  try {
    const obj = `headline='${headline}',article_type='${article_type}',description='${description}',category_id='${category_id}',slug='${slug}',meta_title='${meta_title}',meta_desc='${meta_desc}',meta_keywords='${meta_keywords}',modified='${modified}'`;

    const [article] = await Article.editData("articles", obj, id);

    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.deleteArticle = async (req, res, next) => {
  const id = req.params.id;
  try {
    const [article] = await Article.hardDelete("articles", `id=${id}`);
    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
