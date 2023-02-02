const express = require("express");
const { authPage } = require("../middleware/is-auth");
const frontRoute = require("../controllers/front");
const multer = require("multer");

const router = express.Router();

const upload = multer();

// router.get("/reports", frontRoute.AllReports);
router.get("/reports", frontRoute.AllReports);
router.get("/report/:slug", frontRoute.getReport);
router.get("/categories", frontRoute.AllCategories);
router.get("/category/:id", frontRoute.getCategoryReports);
router.get("/cat/:id", frontRoute.getCategoryDetail);
// router.get("/search", frontRoute.getSearchReports);
router.get("/latest-reports", frontRoute.getLatestReports);
router.get("/latest-pressreleases", frontRoute.getLatestPressReleases);
router.get("/latest-analysis", frontRoute.getLatestAnalysis);
router.get("/testimonials", frontRoute.AllTestimonials);
router.get("/clients", frontRoute.AllClients);
router.post("/contact", upload.none(), frontRoute.contactFormController);
router.post("/req-email", upload.none(), frontRoute.MailController);
router.get("/pressreleases", frontRoute.AllPressReleases);
router.get("/pressreleases/:id", frontRoute.getPressReleases);
router.get("/analysis", frontRoute.AllAnalysis);
router.get("/analysis/:id", frontRoute.getAnalysis);
router.get("/settings", frontRoute.getSettings);
router.get("/auto-search", frontRoute.getSearchAlias);
router.get("/search", frontRoute.getSearchReport);

module.exports = router;
