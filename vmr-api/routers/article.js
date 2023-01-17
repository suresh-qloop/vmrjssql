const express = require("express");
const { authPage } = require("../middleware/is-auth");
const articleRoute = require("../controllers/article");
const multer = require("multer");

const router = express.Router();

const upload = multer();

router.get("/", authPage([1, 2]), articleRoute.AllArticles);
router.get("/:id", authPage([1, 2]), articleRoute.getArticle);
router.post("/", upload.none(), authPage([1, 2]), articleRoute.addArticle);
router.put("/:id", upload.none(), authPage([1, 2]), articleRoute.editArticle);
router.delete("/:id", authPage([1]), articleRoute.deleteArticle);

module.exports = router;
