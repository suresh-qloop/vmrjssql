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
router.get("/search", frontRoute.getSearchReports);
router.get("/latest-reports", frontRoute.getLatestReports);
router.get("/latest-articles", frontRoute.getLatestArticles);
router.get("/testimonials", frontRoute.AllTestimonials);
router.get("/clients", frontRoute.AllClients);
router.post("/contact", upload.none(), frontRoute.contactFormController);

module.exports = router;
