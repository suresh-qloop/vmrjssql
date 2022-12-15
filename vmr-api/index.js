require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const adminRoutes = require("./routers/admin");
const errorController = require("./controllers/error");

const app = express();
/**
 * @middleware
 */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//enable cros
app.use(cors({ origin: ["http://localhost:8080"], credentials: true }));
app.use(helmet());

/**
 * @routers
 */
app.get("/", (req, res) => {
  res.send("home");
});
app.use("/admin", adminRoutes);
app.use(errorController.get404);
app.use(errorController.get500);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`running at http://localhost:${port} `));
