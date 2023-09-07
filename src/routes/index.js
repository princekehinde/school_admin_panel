const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const user = require("../routes/user");
// const BlogPost_Router = require("../routes/blogPost");
// const Admins_Router = require("../routes/admins");
// const SuperAdmins_Router = require("../routes/superAdmins");
// const comment_Router = require("../routes/comments");

app.use("/user/", user);
// app.use("/api/blog/", BlogPost_Router);
// app.use("/api/admin/", Admins_Router);
// app.use("/api/superAdmin/", SuperAdmins_Router);
// app.use("/api/comment/", comment_Router);
app.get("/home", (req, res) => {
  res.status(200).send("welcome to the home page");
});

module.exports = app;

