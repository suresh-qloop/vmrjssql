const express = require("express");
const { authPage } = require("../middleware/is-auth");
const categoryRoute = require("../controllers/category");
const multer = require("multer");

const router = express.Router();

const upload = multer();

// router.get("/", (req, res) => {
//   res.send("home");
// });

router.get("/", authPage([1]), categoryRoute.AllCategory);
router.get("/drop-list", categoryRoute.dropListCategory);
router.get("/:id", authPage([1]), categoryRoute.getCategory);
router.post("/", upload.none(), authPage([1]), categoryRoute.addCategory);
router.put("/:id", upload.none(), authPage([1]), categoryRoute.editCategory);
router.delete(
  "/:id",
  upload.none(),
  authPage([1]),
  categoryRoute.deleteCategory
);
router.delete(
  "/status/:id",
  upload.none(),
  authPage([1]),
  categoryRoute.categoryStatus
);

router.get("/child/:id", authPage([1]), categoryRoute.AllChildCategory);
router.post(
  "/add-child/:id",
  upload.none(),
  authPage([1]),
  categoryRoute.addChildCategory
);
router.delete(
  "/delete-child/:id",
  upload.none(),
  authPage([1]),
  categoryRoute.deleteChildCategory
);

module.exports = router;
