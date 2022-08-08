const express = require("express");
const router = express.Router();
const User = require("../db/models/users");
const jwt = require("jsonwebtoken");

router.post("/login", async (req,res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.json({message: "Fill all the Fields"});
    }
    try{
        const checkEmail = await User.findOne({email: email});
        if(!checkEmail){
            return res.json({message: "This Email is not Registered"});
        }
        const user = await User.findOne({email: email, password: password});
        if(user){
            const token = jwt.sign({ ...user }, process.env.SECRET_KEY);
            res.cookie("jwt", token, { expires:new Date(Date.now() + 25892000000), httpOnly:true });
            return res.status(200).json({message: "LoggedIn Successfully"});
        }
        res.json({message: "Invalid Credentials"});
    }catch(err){
        console.log(err);
    }
})

module.exports = router;