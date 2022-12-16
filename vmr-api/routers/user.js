const express = require("express");
const adminRoute = require("../controllers/user");
const multer = require("multer");
const { authPage } = require("../middleware/is-auth");

const router = express.Router();

const upload = multer();

router.get("/", authPage([1]), adminRoute.AllUser);
router.get("/:id", authPage([1]), adminRoute.getUser);
router.put("/:id", authPage([1]), upload.none(), adminRoute.editUser);
router.post("/", upload.none(), authPage([1]), adminRoute.addUser);
router.delete("/:id", upload.none(), authPage([1]), adminRoute.deleteUser);
router.post("/login", upload.none(), adminRoute.login);
router.put(
  "/change",
  upload.none(),
  authPage([1]),
  adminRoute.changeUserPassword
);
router.put(
  "/reset/:id",
  upload.none(),
  authPage([1]),
  adminRoute.resetUserPassword
);
router.delete("/status/:id", authPage([1]), adminRoute.userStatus);

module.exports = router;
