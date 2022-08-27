const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Message, User } = require("../db/models/users");

router.get("/about", auth, (req,res) => {
    res.json({status: 200, data: req.rootUser});
})

router.delete("/timeline/:id", auth, async (req,res) => {
    const {email,messages} = req.rootUser;
    const updatedMessages = messages.filter((msg,index) => {
        return index != req.params.id;
    });
    try{
        const userData = await User.findOne({email: email});
        userData.messages = updatedMessages;
        await userData.save();
        res.json({status: 200});

    }catch(err){
        res.json({status: 500});
    }
})

module.exports = router;