const express = require("express");
const route = express.Router();
const {
  addBlog,
  getBlog,
  getBlogSingle,
  deleteBlog,
  updateBlog,
} = require("../controller/blogController");
const multer = require("multer");
const { isAuthenticated } = require("../middlware/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });
route.post("/add", upload.single("photo"), isAuthenticated, addBlog);
route.get("/blogs", isAuthenticated, getBlog);
route.get("/blogsingle/:id", isAuthenticated, getBlogSingle);
route.delete("/delete/:id", isAuthenticated, deleteBlog);
route.put("/update/:id", upload.single("photo"), isAuthenticated, updateBlog);

module.exports = route;
