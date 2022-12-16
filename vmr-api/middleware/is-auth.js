const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const Admin = require("../models/Model");
const authPage = (permission) => {
  return async (req, res, next) => {
    const authHeader = req.get("Authorization");

    if (!authHeader) {
      return res.status(401).json({
        error: "Not authenticated.",
      });
    }
    const token = await authHeader.split(" ")[1];
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, SECRET);
    } catch (err) {
      return res.status(500).json({
        error: "Jwt expired.",
      });
    }
    if (!decodedToken) {
      return res.status(401).json({
        error: "Not authenticated.",
      });
    }
    req.userId = decodedToken.userId;
    const userId = req.userId;

    const [user] = await Admin.getOne("users", "id,role", `id=${userId}`);

    const userRole = user[0].role;
    if (permission.includes(userRole)) {
      next();
    } else {
      return res.status(401).json({
        error: "You are not Right Person",
      });
    }
  };
};

module.exports = { authPage };
