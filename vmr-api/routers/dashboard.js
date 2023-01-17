const express = require("express");
const { authPage } = require("../middleware/is-auth");
const dashboardRoute = require("../controllers/dashboard");
const multer = require("multer");

const router = express.Router();

const upload = multer();

router.get(
  "/enquiriesCount",
  authPage([1, 2, 3, 4, 11, 12]),
  dashboardRoute.EnquiriesCount
);

module.exports = router;
