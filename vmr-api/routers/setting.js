const express = require("express");
const { authPage } = require("../middleware/is-auth");
const settingRoute = require("../controllers/setting");
const multer = require("multer");

const router = express.Router();

const upload = multer();

router.get("/", authPage([1, 2]), settingRoute.AllSettings);
router.get("/:id", authPage([1, 2]), settingRoute.getSetting);
router.post("/", authPage([1, 2]), settingRoute.addSetting);
router.put("/:id", authPage([1, 2]), settingRoute.editSetting);

module.exports = router;
