const express = require("express");
const { authPage } = require("../middleware/is-auth");
const seoReportRoute = require("../controllers/seo_report");
const multer = require("multer");

const router = express.Router();

const upload = multer();

router.get("/", authPage([3]), seoReportRoute.AllSEOReports);
router.get("/search", authPage([3]), seoReportRoute.searchReport);
router.get("/:id", authPage([3]), seoReportRoute.getReport);
router.get("/view/:id", authPage([3]), seoReportRoute.getViewReport);

router.put("/:id", upload.none(), authPage([3]), seoReportRoute.editReport);

module.exports = router;
