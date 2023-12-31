const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const user = require("../routes/user");
const student = require("../routes/student");
const Admins = require("../routes/admin");
// const SuperAdmins_Router = require("../routes/superAdmins");
// const comment_Router = require("../routes/comments");

app.use("/user/", user);
app.use("/api/student/", student);
app.use("/api/admin/", Admins);
// app.use("/api/superAdmin/", SuperAdmins_Router);
// app.use("/api/comment/", comment_Router);
app.get("/home", (req, res) => {
  res.status(200).send("welcome to the home page");
});

module.exports = app;

