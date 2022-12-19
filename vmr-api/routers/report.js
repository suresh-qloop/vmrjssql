const express = require("express");
const { authPage } = require("../middleware/is-auth");
const reportRoute = require("../controllers/report");
const multer = require("multer");

const router = express.Router();

const upload = multer();

router.get("/", authPage([1]), reportRoute.AllReports);
router.get("/search", authPage([1]), reportRoute.searchReport);
router.get("/:id", authPage([1]), reportRoute.getReport);
router.post("/", upload.none(), authPage([1]), reportRoute.addReport);
router.put("/:id", upload.none(), authPage([1]), reportRoute.editReport);
router.delete("/:id", authPage([1]), reportRoute.deleteReport);
router.delete("/status/:id", authPage([1]), reportRoute.reportStatus);
router.post(
  "/faq/:id",
  upload.none(),
  authPage([1]),
  reportRoute.addReportFaqs
);

module.exports = router;
