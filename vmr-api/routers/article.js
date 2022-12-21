const express = require("express");
const { authPage } = require("../middleware/is-auth");
const articleRoute = require("../controllers/article");
const multer = require("multer");

const router = express.Router();

const upload = multer();

router.get("/", authPage([1]), articleRoute.AllArticles);
// router.get("/search", authPage([1]), reportRoute.searchReport);
router.get("/:id", authPage([1]), articleRoute.getArticle);
router.post("/", upload.none(), authPage([1]), articleRoute.addArticle);
router.put("/:id", upload.none(), authPage([1]), articleRoute.editArticle);
// router.delete("/:id", authPage([1]), reportRoute.deleteReport);
// router.delete("/status/:id", authPage([1]), reportRoute.reportStatus);
// router.post(
//   "/faq/:id",
//   upload.none(),
//   authPage([1]),
//   reportRoute.addReportFaqs
// );

module.exports = router;
