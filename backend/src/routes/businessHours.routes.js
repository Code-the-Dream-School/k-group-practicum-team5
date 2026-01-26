const express = require("express");
const router = express.Router();
const {
  getBusinessHours,
  getOpenStatus,
  updateBusinessHours,
} = require("../controllers/businessHours.controller");

router.get("/", getBusinessHours);
router.get("/status", getOpenStatus);
router.put("/", updateBusinessHours); // admin

module.exports = router;

