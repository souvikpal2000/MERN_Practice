const express = require("express");
const auth = require("../middleware/auth");
const { Reply, Message, User } = require("../db/models/users");
const { UnRegUserMessage, UnRegUser } = require("../db/models/unreg_users");
const router = express.Router();

router.get("/contact", auth, (req, res) => {
    res.json({status: 200, data: req.rootUser})
});

router.post("/contact", async (req, res) => {
    const {email} = req.body;
    try{
        const user = await User.findOne({email: email});

        if(!user){
            const data = await UnRegUser.findOne({email: email});

            const message = new UnRegUserMessage({
                desc: req.body.message
            })

            if(!data){
                const userData = new UnRegUser({
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone
                });
                const saveUserData = await userData.save();
                saveUserData.messages.push(message);
                await saveUserData.save();
                return res.json({status: 200, message: "Message Sent Successfully"});
            }

            data.messages.push(message);
            await data.save();
            return res.json({status: 200, message: "Message Sent Successfully"});
        }

        const message = new Message({
            desc: req.body.message
        });

        user.messages.push(message);
        await user.save();
        res.json({status: 200, message: "Message Sent Successfully"});
    }catch(err){
        console.log(err);
    }
});

router.post("/reply/:email/:id", async (req, res) => {
    const email = req.params.email;
    const messageId = req.params.id;
    try{
        const userData = await User.findOne({email: email});
        if(userData){
            const { messages } = userData;
            const message = messages[messageId];
            if(message == undefined){
                return res.status(403).json({message: "Message Unavailable"});
            }
            const reply = new Reply({
                desc: req.body.reply
            });
            message.replies.push(reply);
            await userData.save();
            res.status(200).json({message: "Reply sent Successfully"});
        }else{
            res.status(401).json({message: "This Email is not Registered"});
        }
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router;