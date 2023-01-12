const express = require("express");
const { authPage } = require("../middleware/is-auth");
const dashboardRoute = require("../controllers/dashboard");
const multer = require("multer");

const router = express.Router();

const upload = multer();

router.get("/enquiriesCount", authPage([1]), dashboardRoute.EnquiriesCount);
// router.get("/search", authPage([1]), enquirieRoute.enquirieFilters);
// router.put("/status/:id", authPage([1]), enquirieRoute.enquirieStatus);
// router.put("/rating/:id", authPage([1]), enquirieRoute.enquirieRating);
// router.get("/csv", authPage([1]), enquirieRoute.getCSVData);

module.exports = router;
