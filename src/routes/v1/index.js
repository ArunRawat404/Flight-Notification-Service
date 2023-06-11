const express = require("express");

const { InfoController } = require("../../controllers");

const router = express.Router();

// /api/v1/info
router.get("/info", InfoController.info);

module.exports = router;
