const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    phone: "+1 (425) 750-6660",
    email: "spetersen55@gmail.com",
    address: "22715 u.s.2 monroe, WA 98272",
  })
})

module.exports = router;