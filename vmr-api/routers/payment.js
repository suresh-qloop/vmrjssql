const express = require("express");
const { authPage } = require("../middleware/is-auth");
const paymentRoute = require("../controllers/payment");
const multer = require("multer");

const router = express.Router();

const upload = multer();

router.post("/", paymentRoute.orderReport);
// router.post("/payment-verification", paymentRoute.paymentVerification);
router.post("/payment-user-add", paymentRoute.paymentUserAdd);
// router.get("/get-key", paymentRoute.getKey);

module.exports = router;
