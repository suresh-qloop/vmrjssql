const express = require("express");
const { authPage } = require("../middleware/is-auth");
const reportRoute = require("../controllers/report");
const multer = require("multer");

const router = express.Router();

const upload = multer();

router.get("/", authPage([1, 2]), reportRoute.AllReports);
router.get("/search", authPage([1, 2]), reportRoute.searchReport);
router.get(
  "/dropdownlist",
  authPage([1, 2]),
  reportRoute.AllReportsDropDownList
);
router.get("/:id", authPage([1, 2]), reportRoute.getReport);
router.get("/view/:id", authPage([1, 2]), reportRoute.getViewReport);
router.post("/", upload.none(), authPage([1, 2]), reportRoute.addReport);
router.post(
  "/report-check",
  upload.none(),
  authPage([1, 2, 4]),
  reportRoute.checkReport
);
router.post(
  "/alias-check",
  upload.none(),
  authPage([1, 2, 4]),
  reportRoute.checkAlias
);
router.put("/:id", upload.none(), authPage([1, 2]), reportRoute.editReport);
router.delete("/:id", authPage([1, 2]), reportRoute.deleteReport);
router.delete("/status/:id", authPage([1, 2]), reportRoute.reportStatus);
router.post(
  "/faq/:id",
  upload.none(),
  authPage([1, 2]),
  reportRoute.addReportFaqs
);

module.exports = router;
