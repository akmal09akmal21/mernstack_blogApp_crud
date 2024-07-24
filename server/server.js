const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
let cors = require("cors");
const path = require("path");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");
const databaseDB = require("./config/db.config");

databaseDB();
// middlware
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/blog", blogRoutes);
app.use("/users", userRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const port = process.env.PORT || 5005;
app.listen(port, () => {
  console.log(`${port}-portda ishladi`);
});
