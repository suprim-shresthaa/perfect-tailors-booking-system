const express = require("express");

const adminAuthController = require("../controllers/adminAuthController");
const router = express.Router();

router.post("/login", adminAuthController.loginAdmin);
router.post("/logout", adminAuthController.logoutAdmin);

module.exports = router;