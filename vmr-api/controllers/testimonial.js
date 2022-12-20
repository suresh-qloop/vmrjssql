const Testimonial = require("../models/Model");
const moment = require("moment/moment");
const { toUpperCase } = require("../utils/utils");
const { check, validationResult } = require("express-validator");

exports.AllTestimonial = async (req, res, next) => {
  try {
    const [testimonials] = await Testimonial.fetchAll(
      "testimonials",
      "id,testimonial_title,testimonial_description,is_active",
      "id DESC"
    );

    res.status(200).json(testimonials);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getTestimonial = async (req, res, next) => {
  const id = req.params.id;
  try {
    const [testimonial] = await Testimonial.getOne(
      "testimonials",
      "id,testimonial_title,testimonial_description,is_active",
      `id=${id}`
    );
    res.status(200).json(testimonial[0]);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.addTestimonial = async (req, res, next) => {
  await check("testimonial_title").notEmpty().run(req);
  await check("testimonial_description").notEmpty().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  const testimonial_title = toUpperCase(req.body.testimonial_title);
  const testimonial_description = toUpperCase(req.body.testimonial_description);

  let modified = moment(new Date()).format("YYYY-MM-D H:MM:SS");

  try {
    const value = `("${req.userId}","${testimonial_title}", "${testimonial_description}","${modified}")`;
    const [testimonial] = await Testimonial.addData(
      "testimonials",
      "(user_id,testimonial_title, testimonial_description,modified)",
      value
    );

    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.editTestimonial = async (req, res, next) => {
  await check("testimonial_title").notEmpty().run(req);
  await check("testimonial_description").notEmpty().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  const id = req.params.id;
  const testimonial_title = toUpperCase(req.body.testimonial_title);
  const testimonial_description = toUpperCase(req.body.testimonial_description);

  let modified = moment(new Date()).format("YYYY-MM-D H:MM:SS");

  try {
    const obj = `testimonial_title="${testimonial_title}",testimonial_description="${testimonial_description}",modified="${modified}"`;

    const [testimonial] = await Testimonial.editData("testimonials", obj, id);
    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.deleteTestimonial = async (req, res, next) => {
  const id = req.params.id;
  try {
    const [testimonial] = await Testimonial.softDelete(
      "testimonials",
      "is_deleted = 1",
      id
    );
    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.TestimonialStatus = async (req, res, next) => {
  const id = req.params.id;

  try {
    const [testimonial] = await Testimonial.getOne(
      "testimonials",
      "is_active",
      `id=${id}`
    );

    if (testimonial[0].is_active === 0) {
      obj = `is_active = 1`;
      const [sql] = await Testimonial.editData("testimonials", obj, id);
      return res.status(201).json({
        message: "success",
      });
    }
    if (testimonial[0].is_active === 1) {
      obj2 = `is_active = 0`;
      const [sql2] = await Testimonial.editData("testimonials", obj2, id);
      return res.status(201).json({
        message: "success",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
