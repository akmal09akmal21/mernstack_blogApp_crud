const express = require("express");
const route = express.Router();
const {
  signUp,
  signIn,
  logout,
  userProfil,
} = require("../controller/userController");
const { isAuthenticated } = require("../middlware/auth");
route.post("/signup", signUp);
route.post("/signin", signIn);
route.get("/logout", logout);
route.get("/profile", isAuthenticated, userProfil);
module.exports = route;
