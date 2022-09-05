const express = require("express");
const router = express.Router();
const { User } = require("../db/models/users");

router.get("/admin", async (req,res) => {
    try{    
        const users = await User.find();
        res.json({status: 200, users: users});
    }catch(err){
        res.json({status: 500, message: "Internal Server Error"});
    }
});

module.exports = router;