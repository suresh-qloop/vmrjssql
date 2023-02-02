const Model = require("../models/Model");
const moment = require("moment/moment");
const {
  toUpperCase,
  cleanString,
  convertURlString,
} = require("../utils/utils");
const { check, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const { query } = require("../models/config");
const { findById } = require("../models/Model");
const md5 = require("md5");

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
    // const [reports] = await Model.findById(
    //   "products p,product_categories pc",
    //   "p.id,p.product_name,p.category_id,p.product_description,p.publisher_name,p.price,p.pub_date,p.slug,p.is_active",
    //   `p.id = pc.product_id AND p.is_deleted = 0 AND p.is_active = 1`,
    //   `p.id DESC LIMIT ${start},${limit}`
    // );
    const [reports] = await Model.findById(
      "products p",
      "p.id,p.product_name,p.product_description,p.publisher_name,p.price,p.pub_date,p.slug,p.is_active",
      `p.is_deleted = 0 AND p.is_active = 1`,
      `p.id DESC LIMIT ${start},${limit}`
    );
    // const [co] = await Model.findById(
    //   "products p,product_categories pc",
    //   "*",
    //   `p.id = pc.product_id AND p.is_deleted = 0 AND p.is_active = 1`,
    //   "p.id DESC"
    // );
    const [co] = await Model.findById(
      "products p",
      "*",
      `p.is_deleted = 0 AND p.is_active = 1`,
      "p.id DESC"
    );
    // const result0 = reports;
    // Array.prototype.unique = function () {
    //   var a = this.concat();
    //   for (var k = 0; k < a.length; ++k) {
    //     for (var j = k + 1; j < a.length; ++j) {
    //       if (a[k].id === a[j].id) a.splice(j--, 1);
    //     }
    //   }
    //   return a;
    // };
    // let co = c.concat(c).unique();
    let count = co.length;
    // let reports = results.concat(results).unique();
    // console.log(reports);
    res.status(200).json({ reports, count });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.AllCategories = async (req, res, next) => {
  let categories = [];
  try {
    const [arr] = await Model.findById(
      "categories",
      "id,category_name,parent_category_id,is_active",
      "parent_category_id = 2",
      "category_name ASC"
    );

    // console.log(arr);

    // for (i = 0; i < arr.length; i++) {
    // console.log(arr[i]);
    // console.log(i);
    // const [total] = await Model.findById(
    //   "product_categories pc",
    //   "pc.*",
    //   `category_id=${arr[i].id}`,
    //   "pc.id ASC"
    // );
    // const reports = total.length;
    // const [child] = await Model.findById(
    //   "categories",
    //   "id,category_name,parent_category_id,is_active",
    //   `parent_category_id = ${arr[i].id}`,
    //   "category_name ASC"
    // );

    // let obj = {
    //   id: arr[i].id,
    //   name: arr[i].category_name,
    //   status: arr[i].is_active,
    //   children: [],
    //   reports: 2,
    // };

    // for (j = 0; j < child.length; j++) {
    //   const [t] = await Model.findById(
    //     "product_categories pc",
    //     "pc.*",
    //     `category_id=${arr[j].id}`,
    //     "pc.id ASC"
    //   );
    //   const all = t.length;
    //   let childObj = {
    //     id: child[j].id,
    //     name: child[j].category_name,
    //     is_active: child[j].is_active,
    //     reports: all,
    //   };
    //   obj.children.push(childObj);
    // }
    //   categories.push(obj);
    // }

    // let obj = {};

    Array.prototype.unique = function () {
      var a = this.concat();
      for (var k = 0; k < a.length; ++k) {
        for (var j = k + 1; j < a.length; ++j) {
          if (a[k].id === a[j].id) a.splice(j--, 1);
        }
      }
      return a;
    };
    await Promise.all(
      arr.map(async (item) => {
        const [pr] = await Model.findById(
          "products p,product_categories pc",
          "p.id,p.product_name,p.category_id,p.product_description,p.publisher_name,p.price,p.pub_date,p.slug,p.is_active",
          `pc.category_id=${item.id} AND p.id = pc.product_id AND p.is_deleted = 0 AND p.is_active = 1`,
          "p.id ASC"
        );
        let total = pr.concat(pr).unique();
        let reports = total.length;

        let [child] = await Model.findById(
          "categories",
          "id,category_name,parent_category_id,is_active",
          `parent_category_id = ${item.id}`,
          "category_name ASC"
        );

        let obj = {
          id: item.id,
          name: item.category_name,
          status: item.is_active,
          children: [],
          reports: reports,
        };
        await Promise.all(
          child.map(async (child, i) => {
            const [cr] = await Model.findById(
              "products p,product_categories pc",
              "p.id,p.product_name,p.category_id,p.product_description,p.publisher_name,p.price,p.pub_date,p.slug,p.is_active",
              `pc.category_id=${child.id} AND p.id = pc.product_id AND p.is_deleted = 0 AND p.is_active = 1`,
              "pc.id ASC"
            );

            let t = cr.concat(cr).unique();
            const all = t.length;
            let childObj = {
              id: child.id,
              name: child.category_name,
              is_active: child.is_active,
              reports: all,
            };
            return obj.children.push(childObj);
          })
        );
        return categories.push(obj);
      })
    );
    categories.sort((a, b) => a.name.localeCompare(b.name));

    res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getReport = async (req, res, next) => {
  const slug = req.params.slug;

  try {
    const [report] = await Model.getOne("products", "*", `slug='${slug}'`);

    const [c] = await Model.findById(
      "product_categories pc, categories c",
      "pc.*,c.category_name",
      `pc.category_id = c.id AND pc.product_id=${report[0].id}`,
      "pc.id DESC"
    );

    report[0].category_name = await c[0].category_name;
    res.status(200).json(report[0]);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getCategoryReports = async (req, res, next) => {
  const name = req.params.id;
  const start = req.query.start || 0;
  const limit = req.query.limit || 10;

  try {
    Array.prototype.unique = function () {
      var a = this.concat();
      for (var k = 0; k < a.length; ++k) {
        for (var j = k + 1; j < a.length; ++j) {
          if (a[k].id === a[j].id) a.splice(j--, 1);
        }
      }
      return a;
    };
    const [cat] = await Model.findById(
      "categories",
      "*",
      `slug='${name}'`,
      `id DESC`
    );

    const [results] = await Model.findById(
      "products p,product_categories pc",
      "p.id,p.product_name,p.category_id,p.product_description,p.publisher_name,p.price,p.pub_date,p.slug,p.is_active",
      `pc.category_id=${cat[0].id} AND p.id = pc.product_id AND p.is_deleted = 0 AND p.is_active = 1`,
      `p.id DESC LIMIT ${start},${limit}`
    );

    const [c] = await Model.findById(
      "products p,product_categories pc",
      "p.*",
      `pc.category_id=${cat[0].id} AND p.id = pc.product_id AND p.is_deleted = 0 AND p.is_active = 1`,
      "p.id DESC"
    );
    let co = c.concat(c).unique();
    let count = co.length;
    let reports = results.concat(results).unique();
    res.status(200).json({ reports, count });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

// exports.getSearchReports = async (req, res, next) => {
//   const name = req.query.name;

//   try {
//     const [reports] = await Model.searchReport(name);

//     res.status(201).json(reports);
//   } catch (err) {
//     return res.status(500).json({
//       error: err.message,
//     });
//   }
exports.getCategoryDetail = async (req, res, next) => {
  const name = req.params.id;
  try {
    const [cat] = await Model.findById(
      "categories",
      "*",
      `slug='${name}'`,
      `id DESC`
    );

    res.status(200).json(cat[0]);
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
      "id,product_name,alias,category_id,product_description,publisher_name,slug,price,pub_date,is_active",
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

exports.getLatestPressReleases = async (req, res, next) => {
  const start = req.query.start || 0;
  const limit = req.query.limit || 3;
  try {
    const [articles] = await Model.findById(
      "articles",
      "id,headline,article_type,description,category_id,slug",
      "article_type = 'press-releases'",
      `id DESC LIMIT ${start},${limit}`
    );

    res.status(200).json(articles);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getLatestAnalysis = async (req, res, next) => {
  const start = req.query.start || 0;
  const limit = req.query.limit || 3;
  try {
    const [articles] = await Model.findById(
      "articles",
      "id,headline,article_type,description,category_id,slug",
      "article_type = 'analysis'",
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
    const [testimonials] = await Model.findById(
      "testimonials",
      "id,testimonial_title,testimonial_description,is_active",
      "is_deleted = 0 AND is_active = 1",
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
    const [clients] = await Model.findById(
      "our_clients",
      "*",
      "is_active='1'",
      "id DESC"
    );

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
  const ip = req.socket.remoteAddress;

  try {
    const [smtpUser] = await Model.findById(
      "settings",
      "*",
      `\`key\`='smtpUser'`,
      "id ASC"
    );
    const [smtpPassword] = await Model.findById(
      "settings",
      "*",
      `\`key\`='smtpPassword'`,
      "id ASC"
    );
    const [mailToUser] = await Model.findById(
      "settings",
      "*",
      `\`key\`='mailToUser'`,
      "id ASC"
    );

    let from = `Value Market Research  <${smtpUser[0].value}>`;

    let transporter = nodemailer.createTransport({
      service: "Mailgun",
      port: 587,
      secure: false,
      auth: {
        user: smtpUser[0].value,
        pass: smtpPassword[0].value,
      },
    });

    res.render(
      "useremail",
      {
        name,
        email,
        number,
        message,
        ip,
      },
      function (err, html) {
        if (err) {
          return res.status(500).json({
            error: err.message,
          });
        } else {
          //Setting up Email settings
          var userMailOptions = {
            from: from,
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
              res.render(
                "adminemail",
                {
                  name,
                  email,
                  number,
                  message,
                  ip,
                },
                function (err, html) {
                  if (err) {
                    return res.status(500).json({
                      error: err.message,
                    });
                  } else {
                    //Setting up Email settings
                    var adminMailOptions = {
                      from: from,
                      to: mailToUser[0].value,
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

exports.MailController = async (req, res, next) => {
  await check("fullName").notEmpty().run(req);
  await check("organization").notEmpty().run(req);
  await check("designation").notEmpty().run(req);
  await check("mobile").notEmpty().run(req);
  await check("corporateEmail").notEmpty().run(req);
  await check("confirmEmail").notEmpty().run(req);
  await check("country").notEmpty().run(req);
  await check("message").notEmpty().run(req);
  await check("type").notEmpty().run(req);
  await check("report").notEmpty().run(req);
  await check("publisher_name").notEmpty().run(req);
  await check("slug").notEmpty().run(req);
  await check("price").notEmpty().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  const name = req.body.fullName;
  const fullName = name.split(" ");

  const organization = req.body.organization;
  const designation = req.body.designation;
  const mobile = req.body.mobile;
  const corporateEmail = req.body.corporateEmail;
  const confirmEmail = req.body.confirmEmail;
  const country = req.body.country;
  const message = req.body.message;
  const subject = req.body.type;
  const ref_page = req.body.type;
  const report = req.body.report;
  const publisher_name = req.body.publisher_name;
  const slug = req.body.slug;
  const price = req.body.price;
  const ip = req.socket.remoteAddress;
  const product_id = req.body.product_id;
  const alias = req.body.alias;
  let first_name = fullName[0];
  let last_name = fullName[1];
  let date = moment().format().slice(0, 19).replace("T", " ");

  try {
    // const to_emails = [
    //   "vaibhavkgupta@gmail.com",
    //   "sales@valuemarketresearch.com",
    //   "vaibhav@decisiondatabases.com",
    //   "sackshig@decisiondatabases.com",
    // ];
    const [smtpUser] = await Model.findById(
      "settings",
      "*",
      `\`key\`='smtpUser'`,
      "id ASC"
    );
    const [smtpPassword] = await Model.findById(
      "settings",
      "*",
      `\`key\`='smtpPassword'`,
      "id ASC"
    );
    const [r] = await Model.findById(
      "settings",
      "*",
      `\`key\`='mailToUser'`,
      "id ASC"
    );
    let mailToUser = r[0].value.split(",");
    let from = `Value Market Research  <${smtpUser[0].value}>`;
    let userSubject = `Regarding your inquiry for ${alias}`;
    let adminSubject = `New Lead Recieved`;
    if (subject == "Download Sample") {
      adminSubject = `New Sample Request: ${alias}`;
    }
    if (subject == "Covid 19 Impact") {
      adminSubject = `New Covid Lead: ${alias}`;
    }

    let transporter = nodemailer.createTransport({
      service: "Mailgun",
      port: 587,
      secure: false,
      auth: {
        user: smtpUser[0].value,
        pass: smtpPassword[0].value,
      },
    });

    const [user] = await Model.findById(
      "users",
      "*",
      `email ='${confirmEmail}'`,
      "id DESC"
    );

    if (user.length > 0) {
      const userId = user[0].id;
      const value2 = `(${user[0].id},${product_id}, 'Enquiry from ${subject}','${message}','${ip}','${ref_page}','${date}','${date}')`;

      const [newEnquirie] = await Model.addData(
        "enquiries",
        "(user_id,product_id,subject,message,visited_ip,ref_page,created,modified)",
        value2
      );
      let leadId = newEnquirie.insertId;

      res.render(
        "user-question-email",
        { report, name, organization },
        function (err, html) {
          if (err) {
            return res.status(500).json({
              error: err.message,
            });
          } else {
            //Setting up Email settings
            let userMailOptions = {
              from: from,
              to: confirmEmail,
              subject: userSubject,
              generateTextFromHtml: true,
              html: html,
            };

            //Execute this to send the mail
            transporter.sendMail(userMailOptions, function (error, response) {
              if (error) {
                console.log(error);
                res.send("Mail Error! Try again");
              } else {
                res.render(
                  "admin-question-email",
                  {
                    report,
                    leadId,
                    name,
                    corporateEmail,
                    mobile,
                    subject,
                    organization,
                    designation,
                    country,
                    message,
                    ip,
                    ref_page,
                    price,
                    userId,
                    slug,
                    publisher_name,
                  },
                  function (err, html) {
                    if (err) {
                      return res.status(500).json({
                        error: err.message,
                      });
                    } else {
                      //Setting up Email settings
                      let adminMailOptions = {
                        from: from,
                        // to: mailToUser[0].value,
                        to: mailToUser,
                        subject: adminSubject,
                        generateTextFromHtml: true,
                        html: html,
                      };

                      //Execute this to send the mail
                      transporter.sendMail(
                        adminMailOptions,
                        function (error, response) {
                          if (error) {
                            console.log(error);
                            // res.send("Mail Error! Try again");
                            return res.status(500).json({
                              error: "Mail Error! Try again",
                            });
                          } else {
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
    } else {
      let hashPassword = md5(
        "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz123456789"
      );

      const value = `('${first_name}','${last_name}','${confirmEmail}','${hashPassword}',11,'${organization}','${designation}',
      '${country}','${mobile}','${ip}','${date}')`;

      const [newUser] = await Model.addData(
        "users",
        "(first_name,last_name,email,password,role,organisation,job_title,country,mobile,visited_ip,modified)",
        value
      );
      const userId = newUser.insertId;

      const value2 = `(${newUser.insertId},${product_id},'Enquiry from ${subject}','${message}','${ip}','${ref_page}','${date}','${date}')`;

      const [newEnquirie] = await Model.addData(
        "enquiries",
        "(user_id,product_id,subject,message,visited_ip,ref_page,created,modified)",
        value2
      );
      let leadId = newEnquirie.insertId;

      res.render(
        "user-question-email",
        { report, name, organization },
        function (err, html) {
          if (err) {
            return res.status(500).json({
              error: err.message,
            });
          } else {
            //Setting up Email settings
            let userMailOptions = {
              from: from,
              to: confirmEmail,
              subject: userSubject,
              generateTextFromHtml: true,
              html: html,
            };

            //Execute this to send the mail
            transporter.sendMail(userMailOptions, function (error, response) {
              if (error) {
                res.send("Mail Error! Try again");
              } else {
                res.render(
                  "admin-question-email",
                  {
                    report,
                    leadId,
                    name,
                    corporateEmail,
                    mobile,
                    subject,
                    organization,
                    designation,
                    country,
                    message,
                    ip,
                    ref_page,
                    price,
                    userId,
                    slug,
                    publisher_name,
                  },
                  function (err, html) {
                    if (err) {
                      return res.status(500).json({
                        error: err.message,
                      });
                    } else {
                      //Setting up Email settings
                      let adminMailOptions = {
                        from: from,
                        // to: mailToUser[0].value,
                        to: mailToUser,
                        subject: adminSubject,
                        generateTextFromHtml: true,
                        html: html,
                      };

                      //Execute this to send the mail
                      transporter.sendMail(
                        adminMailOptions,
                        function (error, response) {
                          if (error) {
                            console.log(error);
                            // res.send("Mail Error! Try again");
                            return res.status(500).json({
                              error: "Mail Error! Try again",
                            });
                          } else {
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
    }
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.AllPressReleases = async (req, res, next) => {
  const start = req.query.start || 0;
  const limit = req.query.limit || 10;
  try {
    const [articles] = await Model.findById(
      "articles",
      "*",
      "article_type = 'press-releases'",
      `id DESC LIMIT ${start},${limit}`
    );
    const [c] = await Model.findById(
      "articles",
      "*",
      "article_type = 'press-releases'",
      "id DESC"
    );
    const count = c.length;

    res.status(200).json({ articles, count });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getPressReleases = async (req, res, next) => {
  const slug = req.params.id;

  try {
    const [article] = await Model.getOne("articles", "*", `slug='${slug}'`);
    res.status(200).json(article[0]);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.AllAnalysis = async (req, res, next) => {
  const start = req.query.start || 0;
  const limit = req.query.limit || 10;
  try {
    const [articles] = await Model.findById(
      "articles",
      "*",
      "article_type = 'analysis'",
      `id DESC LIMIT ${start},${limit}`
    );
    const [c] = await Model.findById(
      "articles",
      "*",
      "article_type = 'analysis'",
      "id DESC"
    );
    const count = c.length;

    res.status(200).json({ articles, count });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getAnalysis = async (req, res, next) => {
  const slug = req.params.id;
  try {
    const [article] = await Model.getOne("articles", "*", `slug='${slug}'`);
    res.status(200).json(article[0]);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
exports.getSettings = async (req, res, next) => {
  try {
    const [settings] = await Model.findById(
      "settings",
      "*",
      `\`key\`='clientQueries' OR \`key\`='reports' OR \`key\`='categories' OR \`key\`='articles' OR \`key\`='clients'`,
      `id DESC`
    );

    const data = {
      clients: settings[0].value,
      clientQueries: settings[1].value,
      articles: settings[2].value,
      categories: settings[3].value,
      reports: settings[4].value,
    };

    res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getSearchAlias = async (req, res, next) => {
  const raw_data = req.query.query;
  let final_data = raw_data.replace(/'|\|"/gi, " ");

  try {
    if (final_data) {
      let keyword = final_data.replace(/'  '/gi, " ");

      let words = keyword.split(" ");
      let idx = 0;
      let is_data = false;
      let filt;

      for (let i = 0; i < words.length; i++) {
        if (idx == 0) {
          filt = `Product.alias LIKE '%${words[i]}%'`;

          idx++;
          is_data = true;
        } else {
          filt += ` AND Product.alias LIKE '%${words[i]}%'`;
        }
      }
      if (is_data == true) {
        const [search_results] = await Model.findById(
          "products Product,product_categories pc",
          "Product.id,Product.alias,Product.slug",
          `${filt} AND Product.is_active = 1 AND Product.is_deleted = 0 AND Product.id = pc.product_id`,
          `Product.id DESC LIMIT 10`
        );

        const result0 = search_results;
        Array.prototype.unique = function () {
          var a = this.concat();
          for (var k = 0; k < a.length; ++k) {
            for (var j = k + 1; j < a.length; ++j) {
              if (a[k].id === a[j].id) a.splice(j--, 1);
            }
          }
          return a;
        };
        let results = search_results.concat(result0).unique();
        res.status(200).json(results);
      }
    }
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getSearchReport = async (req, res, next) => {
  const raw_data = req.query.q;
  let final_data = raw_data.replace(/'|\|"/gi, " ");

  try {
    if (final_data) {
      let keyword = final_data.replace(/'  '/gi, " ");
      let words = keyword.split(" ");
      let idx = 0;
      let is_data = false;

      let keyword_filter = `(Product.alias LIKE '%${keyword}%' OR Product.product_name LIKE '%${keyword}%' OR Product.product_description LIKE '%${keyword}%')`;

      let keyword_order = `CASE WHEN Product.alias LIKE '%${keyword}%' THEN 1
      when Product.product_name LIKE '%${keyword}%'  then 2
      when Product.product_description LIKE '%${keyword}%' then 3 END`;

      let alias_filter;
      let name_filter;
      let desc_filter;

      for (let i = 0; i < words.length; i++) {
        if (words[i]) {
          if (idx == 0) {
            alias_filter = `Product.alias LIKE '%${words[i]}%'`;
            name_filter = `Product.product_name LIKE '%${words[i]}%'`;
            desc_filter = `Product.product_description LIKE '%${words[i]}%'`;

            idx++;
            is_data = true;
          } else {
            alias_filter += ` OR Product.alias LIKE '%${words[i]}%'`;
            name_filter += ` OR Product.product_name LIKE '%${words[i]}%'`;
            desc_filter += ` OR Product.product_description LIKE '%${words[i]}%'`;
          }

          alias_filter += ` AND Product.alias NOT LIKE '%${keyword}%' AND Product.is_active=1`;
          name_filter += ` AND Product.alias NOT LIKE '%${words[i]}%' AND Product.alias NOT LIKE '%${keyword}%' AND Product.product_name NOT LIKE '%${keyword}%' AND Product.is_active=1`;
          desc_filter += ` AND Product.alias NOT LIKE '%${words[i]}%' AND Product.product_name NOT LIKE '%${words[i]}%' AND Product.alias NOT LIKE '%${keyword}%' AND Product.product_name NOT LIKE '%${keyword}%' AND Product.product_description NOT LIKE '%${keyword}%' AND Product.is_active=1`;
        }
      }
      if (is_data == true) {
        const [keyword_results] = await Model.findById(
          "products Product,product_categories pc",
          "Product.id,Product.product_name,Product.category_id,Product.product_description,Product.publisher_name,Product.price,Product.pub_date,Product.slug,Product.is_active",
          `${keyword_filter} AND Product.is_active = 1 AND Product.is_deleted = 0 AND Product.id = pc.product_id`,
          `${keyword_order} LIMIT 50`
        );

        const [alias_results] = await Model.getOne(
          "products Product,product_categories pc",
          "Product.id,Product.product_name,Product.category_id,Product.product_description,Product.publisher_name,Product.price,Product.pub_date,Product.slug,Product.is_active",
          `${alias_filter} AND Product.is_active = 1 AND Product.is_deleted = 0 AND Product.id = pc.product_id LIMIT 50`
        );

        const [name_results] = await Model.getOne(
          "products Product,product_categories pc",
          "Product.id,Product.product_name,Product.category_id,Product.product_description,Product.publisher_name,Product.price,Product.pub_date,Product.slug,Product.is_active",
          `${name_filter}
           AND Product.is_active = 1 AND Product.is_deleted = 0 AND Product.id = pc.product_id LIMIT 50`
        );
        const [desc_results] = await Model.getOne(
          "products Product,product_categories pc",
          "Product.id,Product.product_name,Product.category_id,Product.product_description,Product.publisher_name,Product.price,Product.pub_date,Product.slug,Product.is_active",
          `${desc_filter} AND Product.is_active = 1 AND Product.is_deleted = 0 AND Product.id = pc.product_id LIMIT 50`
        );

        Array.prototype.unique = function () {
          var a = this.concat();
          for (var k = 0; k < a.length; ++k) {
            for (var j = k + 1; j < a.length; ++j) {
              if (a[k].id === a[j].id) a.splice(j--, 1);
            }
          }
          return a;
        };
        let results0 = keyword_results.concat(alias_results).unique();
        let results1 = results0.concat(name_results).unique();
        let search_results = results1.concat(desc_results).unique();
        res.status(200).json({ reports: search_results });
      }
    }
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
