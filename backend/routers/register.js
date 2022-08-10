const express = require("express");
const router = express.Router();
const User = require("../db/models/users");

router.get("/", (req,res) => {
    res.send("Hello Souvik!!!");
});

router.post("/register", async (req,res) => {
    const {name, email, phone, work, password, cpassword} = req.body;
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.json({status: 417, message: "Fill all the Fields"});
    }
    if(password !== cpassword){
        return res.json({status: 401, message: "Password doesn't Match"});
    }
    try{
        const user = await User.findOne({email: email});
        if(user){
            return res.json({status: 409, message: "User already Exist"});
        }
        const newUser = new User(req.body);
        await newUser.save();
        res.json({status: 200, message: "User registered Successfully"});
    }
    catch(err){
        res.status(500).json({error: err})
    }
})

module.exports = router;