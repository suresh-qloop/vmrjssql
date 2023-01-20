export const urlString = (value) => {
  let result;
  result = value
    .replace(/\s/g, "-")
    .replace(/[^A-Za-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .toLowerCase();

  return result;
};
