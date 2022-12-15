const express = require("express");
const adminRoute = require("../controllers/admin");
const multer = require("multer");

const router = express.Router();

const upload = multer();

router.get("/", adminRoute.AllUser);
router.get("/:id", adminRoute.getUser);
router.put("/:id", upload.none(), adminRoute.editUser);
router.post("/", upload.none(), adminRoute.addUser);
router.delete("/:id", upload.none(), adminRoute.deleteUser);
router.put("/change-password", upload.none(), adminRoute.changeUserPassword);
router.put("/reset-password", upload.none(), adminRoute.resetUserPassword);
router.delete("/status/:id", upload.none(), adminRoute.userStatus);

module.exports = router;
