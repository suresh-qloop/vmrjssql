const Payment = require("../models/Model");
const moment = require("moment/moment");
const instanceFunction = require("../index");
// const crypto = require("crypto");
const { check, validationResult } = require("express-validator");
const md5 = require("md5");
exports.orderReport = async (req, res, next) => {
  const data = req.body;
  console.log(data.amount);
  try {
    const options = {
      amount: data.amount * 100,
      currency: "USD",
    };
    const order = await instanceFunction.instance.orders.create(options);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message,
    });
  }
};

// exports.paymentVerification = async (req, res, next) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//     req.body;
//   try {
//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZOR_KEY_SECRET)
//       .update(body.toString())
//       .digest("hex");
//     const isAuthentic = expectedSignature === razorpay_signature;

//     if (isAuthentic) {
//       // Database comes here
//       res.redirect(`${process.env.FRONT_URL}/payment_success`);
//     } else {
//       res.redirect(`${process.env.FRONT_URL}/payment_failed`);
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       error: err.message,
//     });
//   }
// };
exports.paymentUserAdd = async (req, res, next) => {
  console.log(req.body);
  await check("first_name").notEmpty().run(req);
  await check("last_name").notEmpty().run(req);
  await check("organisation").notEmpty().run(req);
  await check("designation").notEmpty().run(req);
  await check("mobile").notEmpty().run(req);
  await check("corporateEmail").notEmpty().run(req);
  await check("address").notEmpty().run(req);
  await check("city").notEmpty().run(req);
  await check("state").notEmpty().run(req);
  await check("country").notEmpty().run(req);
  await check("zipCode").notEmpty().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const organisation = req.body.organisation;
  const designation = req.body.designation;
  const mobile = req.body.mobile;
  const corporateEmail = req.body.corporateEmail;
  const address = req.body.address;
  const city = req.body.city;
  const state = req.body.state;
  const country = req.body.country;
  const zipCode = req.body.zipCode;
  const ip = req.socket.remoteAddress;
  // const product_id = req.body.product_id;
  // const alias = req.body.alias;
  let date = moment().format().slice(0, 19).replace("T", " ");
  try {
    const [userCheck] = await Payment.findById(
      "users",
      "*",
      `email ='${corporateEmail}'`,
      "id DESC"
    );
    if (userCheck.length > 0) {
      const obj2 = `first_name='${first_name}',last_name='${last_name}',organisation='${organisation}',
      job_title='${designation}',address='${address}',city='${city}',pin_code='${zipCode}',
      state='${state}',country='${country}',mobile='${mobile}',visited_ip='${ip}',modified='${date}'`;

      const [updateUser] = await Payment.editData(
        "users",
        obj2,
        userCheck[0].id
      );
      res.status(200).json({
        message: "success",
      });
    } else {
      let hashPassword = md5(
        "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz123456789"
      );
      const value = `('${first_name}','${last_name}','${corporateEmail}','${hashPassword}',11,'${organisation}','${designation}',
      '${address}','${city}','${zipCode}','${state}','${country}','${mobile}','${ip}','${date}')`;

      const [newUser] = await Payment.addData(
        "users",
        "(first_name,last_name,email,password,role,organisation,job_title,address,city,pin_code,state,country,mobile,visited_ip,modified)",
        value
      );

      res.status(200).json({
        message: "success",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message,
    });
  }
};
exports.getKey = async (req, res, next) => {
  try {
    res.status(200).json({
      key: process.env.RAZOR_API_KEY,
      secretKey: process.env.RAZOR_KEY_SECRET,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message,
    });
  }
};
