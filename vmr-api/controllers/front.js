const Model = require("../models/Model");
const moment = require("moment/moment");
const { toUpperCase, cleanString } = require("../utils/utils");
const { check, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const { query } = require("../models/config");
const { findById } = require("../models/Model");

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

    await Promise.all(
      arr.map(async (item) => {
        const [total] = await Model.findById(
          "product_categories pc",
          "pc.*",
          `category_id=${item.id}`,
          "pc.id ASC"
        );
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
            const [t] = await Model.findById(
              "product_categories pc",
              "pc.*",
              `category_id=${child.id}`,
              "pc.id ASC"
            );
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
    console.log(err);
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getReport = async (req, res, next) => {
  const slug = req.params.slug;

  try {
    const [report] = await Model.getOne(
      "products p,categories c",
      "p.*,c.category_name",
      `p.category_id = c.id AND p.slug='${slug}'`
    );
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
      service: "Gmail",
      auth: {
        user: smtpUser[0].value,
        pass: smtpPassword[0].value,
        // user: "prince.queueloop@gmail.com",
        // pass: "vkezezfceqphsmqg",
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
  await check("remarks").notEmpty().run(req);
  await check("name").notEmpty().run(req);
  await check("type").notEmpty().run(req);

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
  const remarks = req.body.remarks;
  const name = req.body.name;
  const type = req.body.type;

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

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser[0].value,
        pass: smtpPassword[0].value,
        // user: "prince.queueloop@gmail.com",
        // pass: "vkezezfceqphsmqg",
      },
    });

    res.render("user-question-email", {}, function (err, html) {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      } else {
        //Setting up Email settings
        let userMailOptions = {
          from: "Value Market Research",
          to: confirmEmail,
          subject: "Contact Information",
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
                fullName,
                organization,
                designation,
                mobile,
                corporateEmail,
                confirmEmail,
                country,
                remarks,
                name,
                type,
              },
              function (err, html) {
                if (err) {
                  return res.status(500).json({
                    error: err.message,
                  });
                } else {
                  //Setting up Email settings
                  let adminMailOptions = {
                    from: "Value Market Research",
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
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.AllArticles = async (req, res, next) => {
  const start = req.query.start || 0;
  const limit = req.query.limit || 10;
  try {
    const [articles] = await Model.fetchAll(
      "articles",
      "*",
      `id DESC LIMIT ${start},${limit}`
    );
    const [c] = await Model.fetchAll("articles", "*", "id DESC");
    const count = c.length;

    res.status(200).json({ articles, count });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getArticle = async (req, res, next) => {
  const id = req.params.id;
  try {
    const [article] = await Model.getOne("articles", "*", `id='${id}'`);
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
    console.log(settings);

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

// exports.getSearchReports = async (req, res, next) => {
//   console.log(req);
//   const raw_data = req.query.query;
//   let final_data = raw_data.replace(/'|\|"/gi, " ");

//   console.log(final_data);
//   try {
//     if (final_data) {
//       let keyword = final_data.replace(/'  '/gi, " ");
//       console.log(keyword);
//       let words = keyword.split(" ");
//       let filter_str = null;
//       let idx = 0;
//       let is_data = false;
//       let filt;
//       let ord;

//       for (let i = 0; i < words.length; i++) {
//         if (idx == 0) {
//           filt = ` AND Product.alias LIKE '%${words[i]}%'`;
//           ord = ` case when Product.alias LIKE '${words[i]}'  then 1
//                        when Product.alias LIKE '${words[i]}%'  then 2
//                        when Product.alias LIKE '%${words[i]}%' then 3
//                        when Product.alias LIKE '%${words[i]}'  then 4 `;

//           idx++;
//           is_data = true;
//         } else {
//           filt += `${filt} AND Product.alias LIKE '%${words[i]}%'`;
//           ord += ` when Product.alias like '${words[i]}'  then 1
//                    when Product.alias like '${words[i]}%'  then 2
//                    when Product.alias like '%${words[i]}%' then 3
//                    when Product.alias like '%${words[i]}'  then 4 `;
//         }
//       }
//       if (is_data == true) {
//         // const [search_results] = $this->Product->find('all', array('conditions' => array($filt, '+Product.is_active' => 1, 'Product.is_deleted' => 0), 'recursive' => 0, 'limit' => 10));
//         const [search_results] = await Model.findById(
//           "products Product,product_categories pc",
//           "Product.*",
//           `${filt} Product.is_active = 1 AND Product.is_deleted = 0 AND Product.id = pc.product_id`,
//           `Product.id DESC LIMIT 10`
//         );
//         res.status(200).json({ search_results });
//       }
//     }
//   } catch (err) {
//     return res.status(500).json({
//       error: err.message,
//     });
//   }
// };
