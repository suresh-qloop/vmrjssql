const express = require("express");
const { authPage } = require("../middleware/is-auth");
const seoArticleRoute = require("../controllers/seo_article");
const multer = require("multer");

const router = express.Router();

const upload = multer();

router.get("/", authPage([3]), seoArticleRoute.AllArticles);
router.get("/:id", authPage([3]), seoArticleRoute.getArticle);
router.put("/:id", upload.none(), authPage([3]), seoArticleRoute.editArticle);

module.exports = router;
