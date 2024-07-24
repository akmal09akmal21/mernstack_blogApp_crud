const blogModel = require("../model/blogModel");

const fs = require("fs");
const addBlog = async (req, res) => {
  const { title, description } = req.body;
  const filename = req.file.filename;
  const obj = {
    title: title,
    description: description,
    photo: filename,
  };

  try {
    const blog = new blogModel(obj);
    blog.save();
    res.status(200).json({ message: "Add Blog", blog: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: "add blog dan xatolik" });
  }
};

const getBlog = async (req, res) => {
  try {
    const getData = await blogModel.find();
    if (!getData) {
      return res.status(401).json({ success: false, message: "blog yuq" });
    }
    res
      .status(200)
      .json({ success: true, message: "blog success", getData: getData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "blog get dan xatolik" });
  }
};

const getBlogSingle = async (req, res) => {
  try {
    const oneBlog = await blogModel.findById(req.params.id);
    if (!oneBlog) {
      return res.status(401).json({ success: false, message: "blog yuq" });
    }
    res
      .status(200)
      .json({ success: true, message: "blog success", getData: oneBlog });
  } catch (error) {}
};

const updateBlog = async (req, res) => {
  const { title, description, photo } = req.body;
  const id = req.params.id;

  let obj = {
    title: title,
    description: description,
    photo: photo,
  };
  if (req.file !== undefined) {
    obj.photo = req.file.filename;
    const getFileData = await blogModel.find({ _id: id });

    await fs.unlink("uploads/" + getFileData[0].photo, (err) => {
      console.log(err);
    });
  }
  try {
    await blogModel.findByIdAndUpdate(id, obj, { new: true });
    const newUpdateBlog = await blogModel.findById(id);

    res.status(200).json({ message: "update Blog", blog: newUpdateBlog });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "update blog dan xatolik" });
  }
};

const deleteBlog = async (req, res) => {
  const id = req.params.id;
  const deleteBlogphoto = await blogModel.find({ _id: id });

  await fs.unlink("uploads/" + deleteBlogphoto[0].photo, (err) => {
    console.log(err);
  });

  try {
    await blogModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Blog delet", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error });
  }
};

module.exports = { addBlog, getBlog, getBlogSingle, updateBlog, deleteBlog };
