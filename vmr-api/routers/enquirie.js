const express = require("express");
const { authPage } = require("../middleware/is-auth");
const enquirieRoute = require("../controllers/enquirie");
const multer = require("multer");

const router = express.Router();

const upload = multer();

router.get("/", authPage([1, 2, 12]), enquirieRoute.AllEnquiries);
router.get("/search", authPage([1, 2, 12]), enquirieRoute.enquirieFilters);
router.put("/status/:id", authPage([1, 2, 12]), enquirieRoute.enquirieStatus);
router.put("/rating/:id", authPage([1, 2, 12]), enquirieRoute.enquirieRating);
router.get("/csv", authPage([1, 2]), enquirieRoute.getCSVData);
// router.post("/", authPage([1]), settingRoute.addSetting);
// router.put("/:id", authPage([1]), settingRoute.editSetting);

module.exports = router;
