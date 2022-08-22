const express = require("express");
const auth = require("../middleware/auth");
const { Message, User } = require("../db/models/users");
const router = express.Router();

router.get("/contact", auth, (req, res) => {
    res.json({status: 200, data: req.rootUser})
});

router.post("/contact", async (req, res) => {
    const {email} = req.body;
    try{
        const user = await User.findOne({email: email});
        const message = new Message({
            desc: req.body.message
        });
        user.messages.push(message);
        await user.save();
        res.json({status: 200, message: "Message Sent Successfully"});
    }catch(err){
        console.log(err);
    }
})

module.exports = router;