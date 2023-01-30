require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const adminRoutes = require("./routers/user");
const categoryRoutes = require("./routers/category");
const reportRoutes = require("./routers/report");
const seoReportRoutes = require("./routers/seo_report");
const seoArticleRoutes = require("./routers/seo_article");
const contentReportRoutes = require("./routers/content_report");
const testimonialRoutes = require("./routers/testimonial");
const clientRoutes = require("./routers/client");
const articleRoutes = require("./routers/article");
const contentArticleRoutes = require("./routers/content_article");
const settingRoutes = require("./routers/setting");
const enquirieRoutes = require("./routers/enquirie");
const dashboardRoutes = require("./routers/dashboard");
const frontRoutes = require("./routers/front");
const Razorpay = require("razorpay");

const app = express();
/**
 * @middleware
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "/uploads/logos")));

//enable cros
// app.use(cors({ origin: [process.env.BACK_URL], credentials: true }));
app.use(cors());
app.use(helmet());

/**
 * @routers
 */

app.get("/", (req, res) => {
  res.send("home");
});

app.use("/user", adminRoutes);
app.use("/category", categoryRoutes);
app.use("/report", reportRoutes);
app.use("/seo-report", seoReportRoutes);
app.use("/seo-article", seoArticleRoutes);
app.use("/content-report", contentReportRoutes);
app.use("/testimonial", testimonialRoutes);
app.use("/client", clientRoutes);
app.use("/article", articleRoutes);
app.use("/content-article", contentArticleRoutes);
app.use("/setting", settingRoutes);
app.use("/enquirie", enquirieRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/front", frontRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

exports.instance = new Razorpay({
  key_id: process.env.RAZOR_API_KEY,
  key_secret: process.env.RAZOR_KEY_SECRET,
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`running at http://localhost:${port} `));
