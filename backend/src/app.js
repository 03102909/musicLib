const express = require("express");
const adminRoutes = require("./routes/adminRoutes");
const path = require("path");

const app = express();

// ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);

module.exports = app;
