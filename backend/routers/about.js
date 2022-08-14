const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/about", auth, (req,res) => {
    res.json({status: 200, data: req.rootUser});
})

module.exports = router;