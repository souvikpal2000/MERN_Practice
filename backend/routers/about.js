const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/about", auth, (req,res) => {
    res.json({message: "Welcome"});
})

module.exports = router;