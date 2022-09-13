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

router.get("/admin/viewmsg/:email", async (req,res) => {
    try{
        const user = await User.findOne({email: req.params.email});
        if(user){
            return res.json({status: 200, messages: user.messages});
        }
        res.json({status: 404, message: "This Email is not Registered"});
    }catch(err){
        res.json({status: 500, message: "Internal Server Error"});
    }
})

module.exports = router;