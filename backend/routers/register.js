const express = require("express");
const router = express.Router();
const User = require("../db/models/users");

router.get("/", (req,res) => {
    res.send("Hello Souvik!!!");
});

router.post("/register", async (req,res) => {
    const {name, email, phone, work, password} = req.body;
    if(!name || !email || !phone || !work || !password){
        return res.status(417).json({message: "Fill all the Fields"});
    }
    try{
        const user = await User.findOne({email: email});
        if(user){
            return res.status(409).json({message: "User already Exist"});
        }
        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).json({message: "User registered Successfully"});
    }
    catch(err){
        res.status(500).json({error: err})
    }
})

module.exports = router;