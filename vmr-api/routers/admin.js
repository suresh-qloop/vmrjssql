const express = require("express");
const adminRoute = require("../controllers/admin");

const router = express.Router();

router.get("/users", adminRoute.AllUser);
router.get("/user", adminRoute.getUser);
router.post("/user", adminRoute.addData);

module.exports = router;
