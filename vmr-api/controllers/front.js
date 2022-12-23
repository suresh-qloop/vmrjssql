const Model = require("../models/Model");
const moment = require("moment/moment");
const { toUpperCase, cleanString } = require("../utils/utils");
const { check, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");

// exports.AllReports = async (req, res, next) => {
//   try {
//     const [reports] = await Model.findById(
//       "products",
//       "id,product_name,category_id,product_description,publisher_name,price,pub_date,is_active",
//       "is_deleted = 0 AND is_active = 1",
//       "id DESC"
//     );

//     res.status(200).json(reports);
//   } catch (err) {
//     return res.status(500).json({
//       error: err.message,
//     });
//   }
// };

exports.AllReports = async (req, res, next) => {
  const start = req.query.start || 0;
  const limit = req.query.limit || 10;
  try {
    const [reports] = await Model.findById(
      "products p,product_categories pc",
      "p.id,p.product_name,p.category_id,p.product_description,p.publisher_name,p.price,p.pub_date,p.slug,p.is_active",
      `p.id = pc.product_id AND p.is_deleted = 0 AND p.is_active = 1`,
      `p.id DESC LIMIT ${start},${limit}`
    );
    const [c] = await Model.findById(
      "products p,product_categories pc",
      "*",
      `p.id = pc.product_id AND p.is_deleted = 0 AND p.is_active = 1`,
      "p.id DESC"
    );
    const count = c.length;

    // const [reports] = await Model.limitedProducts(start, limit);
    // const [c] = await Model.AllProducts();
    // const count = c.length;
    res.status(200).json({ reports, count });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.AllCategories = async (req, res, next) => {
  try {
    const [arr] = await Model.findById(
      "categories",
      "id,category_name,parent_category_id,is_active",
      "parent_category_id = 2",
      "category_name ASC"
    );
    let categories = [];

    for (i = 0; i < arr.length; i++) {
      const [total] = await Model.findById(
        "product_categories pc",
        "pc.*",
        `category_id=${arr[i].id}`,
        "pc.id ASC"
      );
      const reports = total.length;
      const [child] = await Model.findById(
        "categories",
        "id,category_name,parent_category_id,is_active",
        `parent_category_id = ${arr[i].id}`,
        "category_name ASC"
      );

      let obj = {
        id: arr[i].id,
        name: arr[i].category_name,
        status: arr[i].is_active,
        children: [],
        reports: reports,
      };

      for (j = 0; j < child.length; j++) {
        const [t] = await Model.findById(
          "product_categories pc",
          "pc.*",
          `category_id=${arr[j].id}`,
          "pc.id ASC"
        );
        const all = t.length;
        let childObj = {
          id: child[j].id,
          name: child[j].category_name,
          is_active: child[j].is_active,
          reports: all,
        };
        obj.children.push(childObj);
      }
      categories.push(obj);
    }

    res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getReport = async (req, res, next) => {
  // console.log(req);
  const slug = req.params.slug;
  // console.log(slug);

  try {
    const [report] = await Model.getOne(
      "products p,categories c",
      "p.*,c.category_name",
      `p.category_id = c.id AND p.slug='${slug}'`
    );
    console.log(report[0]);
    res.status(200).json(report[0]);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getCategoryReports = async (req, res, next) => {
  const id = req.params.id;
  const start = req.query.start || 0;
  const limit = req.query.limit || 10;
  try {
    const [reports] = await Model.findById(
      "products p,product_categories pc",
      "p.id,p.product_name,p.category_id,p.product_description,p.publisher_name,p.price,p.pub_date,p.slug,p.is_active",
      `pc.category_id=${id} AND p.id = pc.product_id AND p.is_deleted = 0 AND p.is_active = 1`,
      `p.id DESC LIMIT ${start},${limit}`
    );

    const [c] = await Model.findById(
      "products p,product_categories pc",
      "p.*",
      `pc.category_id=${id} AND p.id = pc.product_id AND p.is_deleted = 0 AND p.is_active = 1`,
      "p.id DESC"
    );
    const count = c.length;

    res.status(200).json({ reports, count });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getSearchReports = async (req, res, next) => {
  const name = req.query.name;
  console.log(req);
  console.log(name);

  try {
    const [reports] = await Model.searchReport(name);

    res.status(201).json(reports);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getLatestReports = async (req, res, next) => {
  const start = req.query.start || 0;
  const limit = req.query.limit || 3;
  try {
    const [reports] = await Model.findById(
      "products",
      "id,product_name,category_id,product_description,publisher_name,slug,price,pub_date,is_active",
      `is_deleted = 0 AND is_active = 1`,
      `id DESC LIMIT ${start},${limit}`
    );

    res.status(200).json(reports);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getLatestArticles = async (req, res, next) => {
  const start = req.query.start || 0;
  const limit = req.query.limit || 3;
  try {
    const [articles] = await Model.fetchAll(
      "articles",
      "id,headline,article_type,description,category_id,slug",
      `id DESC LIMIT ${start},${limit}`
    );

    res.status(200).json(articles);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.AllTestimonials = async (req, res, next) => {
  try {
    const [testimonials] = await Model.fetchAll(
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

exports.AllClients = async (req, res, next) => {
  try {
    const [clients] = await Model.fetchAll("our_clients", "*", "id DESC");

    res.status(200).json(clients);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.contactFormController = async (req, res, next) => {
  await check("name").notEmpty().run(req);
  await check("email").notEmpty().run(req);
  await check("number").notEmpty().run(req);
  await check("message").notEmpty().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  const name = req.body.name;
  const email = req.body.email;
  const number = req.body.number;
  const message = req.body.message;

  try {
    // const smtpUser = await Settings.findOne({ name: "smtpUser" });
    // const smtpPassword = await Settings.findOne({ name: "smtpPassword" });
    // const mailToUser = await Settings.findOne({ name: "mailToUser" });
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        // user: smtpUser.value,
        // pass: smtpPassword.value,
        user: "prince.queueloop@gmail.com",
        pass: "",
      },
    });
    res.render(
      "useremail",
      {
        name,
        email,
        number,
        message,
      },
      function (err, html) {
        if (err) {
          console.log("error rendering email template:", err);
          return;
        } else {
          //Setting up Email settings
          var userMailOptions = {
            from: "prince.queueloop@gmail.com",
            to: email,
            subject: "Contact Information",
            generateTextFromHtml: true,
            html: html,
          };

          //Execute this to send the mail
          transporter.sendMail(userMailOptions, function (error, response) {
            if (error) {
              console.log(error);
              res.send("Mail Error! Try again");
            } else {
              console.log(response);

              res.render(
                "adminemail",
                {
                  name,
                  email,
                  number,
                  message,
                },
                function (err, html) {
                  if (err) {
                    console.log("error rendering email template:", err);
                    return;
                  } else {
                    //Setting up Email settings
                    var adminMailOptions = {
                      from: "prince.queueloop@gmail.com",
                      to: "prince.queueloop@gmail.com",
                      subject: "Contact Information",
                      generateTextFromHtml: true,
                      html: html,
                    };

                    //Execute this to send the mail
                    transporter.sendMail(
                      adminMailOptions,
                      function (error, response) {
                        if (error) {
                          console.log(error);
                          res.send("Mail Error! Try again");
                        } else {
                          console.log(response);

                          res.status(201).json({
                            message: "Mail Send successfully",
                          });
                        }
                      }
                    );
                  }
                }
              );
            }
          });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.askQuestionController = async (req, res, next) => {
  await check("fullName").notEmpty().run(req);
  await check("organization").notEmpty().run(req);
  await check("designation").notEmpty().run(req);
  await check("mobile").notEmpty().run(req);
  await check("corporateEmail").notEmpty().run(req);
  await check("confirmEmail").notEmpty().run(req);
  await check("country").notEmpty().run(req);
  await check("question").notEmpty().run(req);
  await check("name").notEmpty().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  const fullName = req.body.fullName;
  const organization = req.body.organization;
  const designation = req.body.designation;
  const mobile = req.body.mobile;
  const corporateEmail = req.body.corporateEmail;
  const confirmEmail = req.body.confirmEmail;
  const country = req.body.country;
  const question = req.body.question;
  const name = req.body.name;
  const type = "Ask Question";

  try {
    // const smtpUser = await Settings.findOne({ name: "smtpUser" });
    // const smtpPassword = await Settings.findOne({ name: "smtpPassword" });
    // const mailToUser = await Settings.findOne({ name: "mailToUser" });
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        // user: smtpUser.value,
        // pass: smtpPassword.value,
        user: "prince.queueloop@gmail.com",
        pass: "",
      },
    });
    res.render("user-question-info-email", {}, function (err, html) {
      if (err) {
        console.log("error rendering email template:", err);
        return;
      } else {
        //Setting up Email settings
        var userMailOptions = {
          from: "prince.queueloop@gmail.com",
          to: confirmEmail,
          subject: "Contact Information",
          generateTextFromHtml: true,
          html: html,
        };

        //Execute this to send the mail
        transporter.sendMail(userMailOptions, function (error, response) {
          if (error) {
            console.log(error);
            res.send("Mail Error! Try again");
          } else {
            console.log(response);

            res.render(
              "admin-question-info-email",
              {
                fullName,
                organization,
                designation,
                mobile,
                corporateEmail,
                confirmEmail,
                country,
                question,
                name,
                type,
              },
              function (err, html) {
                if (err) {
                  console.log("error rendering email template:", err);
                  return;
                } else {
                  //Setting up Email settings
                  var adminMailOptions = {
                    from: "prince.queueloop@gmail.com",
                    to: "prince.queueloop@gmail.com",
                    subject: "Contact Information",
                    generateTextFromHtml: true,
                    html: html,
                  };

                  //Execute this to send the mail
                  transporter.sendMail(
                    adminMailOptions,
                    function (error, response) {
                      if (error) {
                        console.log(error);
                        res.send("Mail Error! Try again");
                      } else {
                        console.log(response);

                        res.status(201).json({
                          message: "Mail Send successfully",
                        });
                      }
                    }
                  );
                }
              }
            );
          }
        });
      }
    });
    // const userMail = await transporter.sendMail({
    //   from: "prince.queueloop@gmail.com",
    //   to: confirmEmail,
    //   subject: "Contact Information",
    //   html: `
    //   <html lang="en-US">
    //   <head>
    //     <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />

    //     <meta
    //       name="keywords"
    //       content="Market Research Reports, Business Research, Industry Analysis, Market Insights, Syndicate Research Reports, Customized Research Reports, Business Consulting, VMR, VMR Reports, Industry Reports, Best market Research Company, Market Research Reports Provider, Research Reports company, Market Report Company"
    //     />
    //     <meta
    //       name="description"
    //       content="The Leading Market Research Reports provider - Value Market Research offers custom market analysis services with market growth prospects and forecasts."
    //     />

    //     <title>
    //       Market Research Reports, Industry Insights: Value Market Research
    //     </title>
    //     <style type="text/css">
    //       a:hover {
    //         text-decoration: underline !important;
    //       }
    //     </style>
    //   </head>

    //   <body
    //     marginheight="0"
    //     topmargin="0"
    //     marginwidth="0"
    //     style="margin: 0px; background-color: #f2f3f8"
    //     leftmargin="0"
    //   >
    //     <!--100% body table-->
    //     <table
    //       cellspacing="0"
    //       border="0"
    //       cellpadding="0"
    //       width="100%"
    //       bgcolor="#f2f3f8"
    //       style="
    //         @import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700);
    //         font-family: 'Open Sans', sans-serif;
    //       "
    //     >
    //       <tr>
    //         <td>
    //           <table
    //             style="background-color: #f2f3f8; max-width: 670px; margin: 0 auto"
    //             width="100%"
    //             border="0"
    //             align="center"
    //             cellpadding="0"
    //             cellspacing="0"
    //           >
    //             <tr>
    //               <td style="height: 80px">&nbsp;</td>
    //             </tr>
    //             <tr>
    //               <td style="height: 20px">&nbsp;</td>
    //             </tr>
    //             <tr>
    //               <td>
    //                 <table
    //                   width="95%"
    //                   border="0"
    //                   align="center"
    //                   cellpadding="0"
    //                   cellspacing="0"
    //                   style="
    //                     max-width: 670px;
    //                     background: #fff;
    //                     border-radius: 3px;
    //                     text-align: center;
    //                     -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
    //                     -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
    //                     box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
    //                   "
    //                 >
    //                   <tr>
    //                     <td style="height: 40px">&nbsp;</td>
    //                   </tr>
    //                   <tr>
    //                     <td style="padding: 0 35px">
    //                       <h1
    //                         style="
    //                           color: #1e1e2d;
    //                           font-weight: 500;
    //                           margin: 0;
    //                           font-size: 32px;
    //                           font-family: 'Rubik', sans-serif;
    //                         "
    //                       >
    //                         Inquiry has been Submitted Successfully
    //                       </h1>
    //                       <span
    //                         style="
    //                           display: inline-block;
    //                           vertical-align: middle;
    //                           margin: 29px 0 26px;
    //                           border-bottom: 1px solid #cecece;
    //                           width: 100px;
    //                         "
    //                       ></span>
    //                       <p
    //                         style="
    //                           color: #455056;
    //                           font-size: 15px;
    //                           line-height: 24px;
    //                           margin: 0;
    //                         "
    //                       >
    //                         Thank you for getting in touch! We appreciate you
    //                         contacting us
    //                       </p>
    //                       <a
    //                         href="https://vmr-app.vercel.app"
    //                         style="
    //                           background: #20e277;
    //                           text-decoration: none !important;
    //                           font-weight: 500;
    //                           margin-top: 35px;
    //                           color: #fff;
    //                           text-transform: uppercase;
    //                           font-size: 14px;
    //                           padding: 10px 24px;
    //                           display: inline-block;
    //                           border-radius: 50px;
    //                         "
    //                         >Click Here</a
    //                       >
    //                     </td>
    //                   </tr>
    //                   <tr>
    //                     <td style="height: 40px">&nbsp;</td>
    //                   </tr>
    //                 </table>
    //               </td>
    //             </tr>

    //             <tr>
    //               <td style="height: 20px">&nbsp;</td>
    //             </tr>
    //             <tr>
    //               <td style="text-align: center">
    //                 <p
    //                   style="
    //                     font-size: 14px;
    //                     color: rgba(69, 80, 86, 0.7411764705882353);
    //                     line-height: 18px;
    //                     margin: 0 0 0;
    //                   "
    //                 >
    //                   &copy; <strong>www.valuemarketresearch.com</strong>
    //                 </p>
    //               </td>
    //             </tr>
    //             <tr>
    //               <td style="height: 80px">&nbsp;</td>
    //             </tr>
    //           </table>
    //         </td>
    //       </tr>
    //     </table>
    //     <!--/100% body table-->
    //   </body>
    // </html>
    //   `,
    // });

    // const AdminMail = await transporter.sendMail({
    //   to: mailToUser.value,
    //   from: "prince.queueloop@gmail.com",
    //   subject: "Contact Information",
    //   html: `
    //   <html lang="en-US">
    //   <head>
    //     <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    //     <title>Contact Information</title>
    //     <meta name="description" content="Contact Information" />
    //     <style type="text/css">
    //       a:hover {
    //         text-decoration: underline !important;
    //       }
    //     </style>
    //   </head>

    //   <body
    //     marginheight="0"
    //     topmargin="0"
    //     marginwidth="0"
    //     style="margin: 0px; background-color: #f2f3f8"
    //     leftmargin="0"
    //   >
    //     <table
    //       cellspacing="0"
    //       border="0"
    //       cellpadding="0"
    //       width="100%"
    //       bgcolor="#f2f3f8"
    //       style="
    //         @import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700);
    //         font-family: 'Open Sans', sans-serif;
    //       "
    //     >
    //       <tr>
    //         <td>
    //           <table
    //             style="background-color: #f2f3f8; max-width: 670px; margin: 0 auto"
    //             width="100%"
    //             border="0"
    //             cellpadding="0"
    //             cellspacing="0"
    //           >
    //             <tr>
    //               <td style="height: 80px">&nbsp;</td>
    //             </tr>
    //             <tr>
    //               <td style="height: 20px">&nbsp;</td>
    //             </tr>
    //             <tr>
    //               <td>
    //                 <table
    //                   width="95%"
    //                   border="0"
    //                   cellpadding="0"
    //                   cellspacing="0"
    //                   style="
    //                     max-width: 670px;
    //                     /* background: #fff; */
    //                     border-radius: 3px;
    //                     text-align: center;
    //                     -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
    //                     -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
    //                     box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
    //                   "
    //                 >
    //                   <tr>
    //                     <td style="height: 40px">&nbsp;</td>
    //                   </tr>
    //                   <tr>
    //                     <td style="padding: 0 35px">
    //                       <h1
    //                         style="
    //                           color: #345f7a;
    //                           font-weight: 500;
    //                           margin: 0;
    //                           font-size: 32px;
    //                           font-family: 'Rubik', sans-serif;
    //                         "
    //                       >
    //                         New Inquiry has been Received
    //                       </h1>
    //                       <p
    //                         style="
    //                           color: #1e1e2d;
    //                           font-weight: 200;
    //                           margin-top: 25px;
    //                           font-size: 23px;
    //                           font-family: 'Rubik', sans-serif;
    //                         "
    //                       >
    //                         From Ask Question
    //                       </p>
    //                       <p
    //                         style="
    //                           color: #5b5b5b;
    //                           font-weight: 200;
    //                           margin-top: 25px;
    //                           font-size: 12px;
    //                           font-family: 'Rubik', sans-serif;
    //                         "
    //                       >
    //                         Check Below Content
    //                       </p>
    //                       <span
    //                         style="
    //                           display: inline-block;
    //                           vertical-align: middle;
    //                           margin: 0px 0 26px;
    //                           border-bottom: 1px solid #cecece;
    //                           width: 100px;
    //                         "
    //                       ></span>
    //                       <p
    //                         style="
    //                           color: #455056;
    //                           font-size: 15px;
    //                           line-height: 24px;
    //                           margin: 0;
    //                         "
    //                       ></p>
    //                     </td>
    //                   </tr>
    //                   <tr>
    //                     <td style="padding: 0 35px">
    //                       <table
    //                         style="table-layout: fixed; min-width: 600px"
    //                         cellspacing="0"
    //                         cellpadding="5"
    //                       >
    //                         <tbody>
    //                           <tr style="border-bottom: 0.5px solid #ddd">
    //                             <td style="width: 30%">
    //                               <div
    //                                 style="
    //                                   margin: 5px;
    //                                   box-shadow: 0 2px 2px #aeaeae;
    //                                   background-color: #d0d0d0;
    //                                   color: white;
    //                                   border-radius: 4px;
    //                                   text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    //                                   text-align: center;
    //                                   padding: 5px;
    //                                 "
    //                               >
    //                                 #
    //                               </div>
    //                             </td>
    //                             <td>
    //                               <div
    //                                 style="
    //                                   margin: 5px;
    //                                   box-shadow: 0 2px 2px #aeaeae;
    //                                   background-color: #d0d0d0;
    //                                   color: white;
    //                                   border-radius: 4px;
    //                                   text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    //                                   text-align: center;
    //                                   padding: 5px;
    //                                 "
    //                               >
    //                                 Information
    //                               </div>
    //                             </td>
    //                           </tr>
    //                           <tr style="border-bottom: 0.5px solid #ddd">
    //                             <td style="background-color: #f5f5f5">Full Name</td>
    //                             <td style="background-color: #f5f5f5">
    //                               ${fullName}
    //                             </td>
    //                           </tr>
    //                           <tr style="border-bottom: 0.5px solid #ddd">
    //                             <td style="background-color: #f5f5f5">
    //                               organization
    //                             </td>
    //                             <td style="background-color: #f5f5f5">
    //                               ${organization}
    //                             </td>
    //                           </tr>
    //                           <tr style="border-bottom: 0.5px solid #ddd">
    //                             <td style="background-color: #f5f5f5">
    //                               Designation
    //                             </td>
    //                             <td style="background-color: #f5f5f5">
    //                               ${designation}
    //                             </td>
    //                           </tr>
    //                           <tr style="border-bottom: 0.5px solid #ddd">
    //                             <td style="background-color: #f5f5f5">Mobile</td>
    //                             <td style="background-color: #f5f5f5">${mobile}</td>
    //                           </tr>
    //                           <tr style="border-bottom: 0.5px solid #ddd">
    //                             <td style="background-color: #f5f5f5">
    //                               Corporate Email
    //                             </td>
    //                             <td style="background-color: #f5f5f5">
    //                               ${corporateEmail}
    //                             </td>
    //                           </tr>
    //                           <tr style="border-bottom: 0.5px solid #ddd">
    //                             <td style="background-color: #f5f5f5">
    //                               Confirm Email
    //                             </td>
    //                             <td style="background-color: #f5f5f5">
    //                               ${confirmEmail}
    //                             </td>
    //                           </tr>
    //                           <tr style="border-bottom: 0.5px solid #ddd">
    //                             <td style="background-color: #f5f5f5">Country</td>
    //                             <td style="background-color: #f5f5f5">
    //                               ${country}
    //                             </td>
    //                           </tr>
    //                           <tr style="border-bottom: 0.5px solid #ddd">
    //                             <td style="background-color: #f5f5f5">Question</td>
    //                             <td style="background-color: #f5f5f5">
    //                               ${question}
    //                             </td>
    //                           </tr>
    //                           <tr style="border-bottom: 0.5px solid #ddd">
    //                             <td style="background-color: #f5f5f5">
    //                               Report Name
    //                             </td>
    //                             <td style="background-color: #f5f5f5">${name}</td>
    //                           </tr>
    //                         </tbody>
    //                       </table>
    //                     </td>
    //                   </tr>
    //                   <tr>
    //                     <td>
    //                       <a
    //                         href="https://vmr-app.vercel.app"
    //                         style="
    //                           background: #20e277;
    //                           text-decoration: none !important;
    //                           font-weight: 500;
    //                           margin-top: 35px;
    //                           color: #fff;
    //                           text-transform: uppercase;
    //                           font-size: 14px;
    //                           padding: 10px 24px;
    //                           display: inline-block;
    //                           border-radius: 50px;
    //                         "
    //                         >Click Here</a
    //                       >
    //                     </td>
    //                   </tr>
    //                   <tr>
    //                     <td style="height: 40px">&nbsp;</td>
    //                   </tr>
    //                 </table>
    //               </td>
    //             </tr>

    //             <tr>
    //               <td style="height: 20px">&nbsp;</td>
    //             </tr>
    //             <tr>
    //               <td style="text-align: center">
    //                 <p
    //                   style="
    //                     font-size: 14px;
    //                     color: rgba(69, 80, 86, 0.7411764705882353);
    //                     line-height: 18px;
    //                     margin: 0 0 0;
    //                   "
    //                 >
    //                   &copy; <strong>www.valuemarketresearch.com</strong>
    //                 </p>
    //               </td>
    //             </tr>
    //             <tr>
    //               <td style="height: 80px">&nbsp;</td>
    //             </tr>
    //           </table>
    //         </td>
    //       </tr>
    //     </table>
    //   </body>
    // </html>
    //   `,
    // });

    // res.status(201).json({
    //   message: "Mail Send successfully",
    // });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
