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
