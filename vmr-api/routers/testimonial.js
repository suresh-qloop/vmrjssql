const express = require("express");
const { authPage } = require("../middleware/is-auth");
const testimonialRoute = require("../controllers/testimonial");
const multer = require("multer");

const router = express.Router();

const upload = multer();

router.get("/", authPage([1]), testimonialRoute.AllTestimonial);
router.get("/:id", authPage([1]), testimonialRoute.getTestimonial);
router.post("/", upload.none(), authPage([1]), testimonialRoute.addTestimonial);
router.put(
  "/:id",
  authPage([1]),
  upload.none(),
  testimonialRoute.editTestimonial
);
router.delete(
  "/:id",
  upload.none(),
  authPage([1]),
  testimonialRoute.deleteTestimonial
);
router.delete("/status/:id", authPage([1]), testimonialRoute.TestimonialStatus);

module.exports = router;
