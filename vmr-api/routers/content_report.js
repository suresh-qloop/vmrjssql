const express = require("express");
const { authPage } = require("../middleware/is-auth");
const contentReportRoute = require("../controllers/content_report");
const multer = require("multer");

const router = express.Router();

const upload = multer();

router.get("/", authPage([4]), contentReportRoute.AllContentReports);
router.get("/search", authPage([4]), contentReportRoute.searchReport);
router.get(
  "/dropdownlist",
  authPage([4]),
  contentReportRoute.AllReportsDropDownList
);
router.get("/:id", authPage([4]), contentReportRoute.getReport);
router.get("/view/:id", authPage([4]), contentReportRoute.getViewReport);
router.post("/", upload.none(), authPage([4]), contentReportRoute.addReport);
router.put("/:id", upload.none(), authPage([4]), contentReportRoute.editReport);
router.post(
  "/faq/:id",
  upload.none(),
  authPage([4]),
  contentReportRoute.addReportFaqs
);

module.exports = router;
