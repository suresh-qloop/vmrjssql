const express = require("express");
const { authPage } = require("../middleware/is-auth");
const enquirieRoute = require("../controllers/enquirie");
const multer = require("multer");

const router = express.Router();

const upload = multer();

router.get("/", authPage([1]), enquirieRoute.AllEnquiries);
// router.get("/:id", authPage([1]), settingRoute.getSetting);
// router.post("/", authPage([1]), settingRoute.addSetting);
// router.put("/:id", authPage([1]), settingRoute.editSetting);

module.exports = router;
