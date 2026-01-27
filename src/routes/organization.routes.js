const express = require("express");
const router = express.Router();

const controller = require("../controllers/organization.controller");

router.post("/", controller.createOrganization);

module.exports = router;
