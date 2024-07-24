const mongoose = require("mongoose");
const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res
        .status(404)
        .json({ success: false, message: "maydonni toliq toldiring" });
    }
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res
        .status(404)
        .json({ success: false, message: "bu odam tzimda mavjud" });
    }
    let salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const user = await userModel.create({
      userName,
      email,
      password: hashPassword,
    });

    res.status(201).json({
      success: true,
      message: "sign up success",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "sign up error",
    });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "maydonni to'liq toldiring",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "bu foydalanuvchi tizimda yo'q",
      });
    }
    // parolni tekshirirsh
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).json({
        success: false,
        message: "xato parol",
      });
    }
    // token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 1000 * 60 * 60,
    });

    // console.log(token);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 60,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 60),
    });
    // res.redirect("/");

    res.status(200).json({
      success: true,
      message: "login dan o'tdi",

      token,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "login controller api dan xatolik",
      error,
    });
  }
};
//LOG OUT USER
const logout = (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
};

const userProfil = async (req, res, next) => {
  const user = await userModel.findById(req.user.id).select("-password");
  res.status(200).json({
    success: true,
    user,
  });
};

module.exports = { signUp, signIn, logout, userProfil };
