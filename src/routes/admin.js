const express = require("express");
const AdminValidation = require("../validation/adminValidation");
const Controller = require("../controllers/adminController");

const router = express();

router.post("/login", AdminValidation.loginForm, Controller.login);

module.exports = router;