const path = require("path");
const fs = require("fs");
exports.toUpperCase = (value) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

exports.cleanString = (value) => {
  let result;
  result = value
    .replace(/\s/g, "-")
    .replace(/[^A-Za-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .toLowerCase();

  return result;
};

exports.clearImage = (file) => {
  let filePath = path.join(__dirname, "../", "uploads", "logos", file);
  fs.unlink(filePath, (err) => console.log(err));
  return;
};
