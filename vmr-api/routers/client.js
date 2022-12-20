const express = require("express");
const { authPage } = require("../middleware/is-auth");
const clientRoute = require("../controllers/client");
const multer = require("multer");

const router = express.Router();

const destination = (req, file, cb) => {
  switch (file.mimetype) {
    case "image/jpg":
      cb(null, "uploads/logos"); // src/api/public/uploads/images
      break;
    case "image/png":
      cb(null, "uploads/logos");
      break;
    case "image/jpeg":
      cb(null, "uploads/logos");
      break;
    default:
      cb("invalid file");
      break;
  }
};

//storage
const storage = multer.diskStorage({
  destination: destination,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
}); //9999999999

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1073741824, // 10000000 Bytes = 10 MB , 1 gb = 1073741824 Bytes
  },
  fileFilter: fileFilter,
});

router.get("/", authPage([1]), clientRoute.AllClientsRoute);
router.get("/:id", authPage([1]), clientRoute.getClient);
router.post(
  "/",
  upload.fields([{ name: "logo", maxCount: 1 }]),
  authPage([1]),
  clientRoute.addClient
);
router.put(
  "/:id",
  upload.fields([{ name: "logo", maxCount: 1 }]),
  authPage([1]),
  clientRoute.editClient
);
router.delete("/:id", upload.none(), authPage([1]), clientRoute.deleteClient);
router.delete("/status/:id", authPage([1]), clientRoute.clientStatus);

module.exports = router;
