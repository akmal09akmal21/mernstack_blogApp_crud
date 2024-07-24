const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

const isAuthenticated = (req, res, next) => {
  // const token = req.cookies.token;
  const { token } = req.cookies;
  // console.log(token);
  if (!token)
    return res.status(401).json({ message: "Not Authenticated! 0011" });

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) return res.status(403).json({ message: "Token is not Valid!" });
    req.userId = payload.id;

    req.user = await userModel.findById(req.userId); // req.user = await userModel.findById(decoded.id);

    next();
  });
};

module.exports = { isAuthenticated };
