const express = require("express");
const { authPage } = require("../middleware/is-auth");
const contentArticleRoute = require("../controllers/content_article");
const multer = require("multer");

const router = express.Router();

const upload = multer();

router.get("/", authPage([4]), contentArticleRoute.AllArticles);
router.get("/:id", authPage([4]), contentArticleRoute.getArticle);
router.post("/", upload.none(), authPage([4]), contentArticleRoute.addArticle);
router.put(
  "/:id",
  upload.none(),
  authPage([4]),
  contentArticleRoute.editArticle
);

module.exports = router;
