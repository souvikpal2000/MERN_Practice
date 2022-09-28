const express = require("express");
const router = express.Router();
const { Reply, User } = require("../db/models/users");

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
            return res.json({status: 200, user: {email: user.email, messages: user.messages}});
        }
        res.json({status: 404, message: "This Email is not Registered"});
    }catch(err){
        res.json({status: 500, message: "Internal Server Error"});
    }
});

router.delete("/delreply/:email/:messageId/:replyId", async (req,res) => {
    const email = req.params.email;
    const messageId = req.params.messageId;
    const replyId = req.params.replyId;
    try{
        const userData = await User.findOne({email: email});
        if(userData){
            const { messages } = userData;
            const message = messages[messageId]
            if(message === undefined){
                return res.status(403).json({message: "Message Unavailable"});
            }
            const { replies } = message;
            const reply = replies[replyId];
            if(reply === undefined){
                return res.status(403).json({message: "Reply Unavailable"});
            }
            const updatedReplies = replies.filter((reply, index) => {
                return index != replyId
            });
            userData.messages[messageId].replies = updatedReplies;
            await userData.save();
            res.json({status: 200});
        }else{
            res.status(401).json({message: "This Email is not Registered"});
        }
    }
    catch(err){
        console.log(err);
    }
});

// router.get("/adminreply/:email/:id", async (req, res) => {
//     const email = req.params.email;
//     const messageId = req.params.id;
//     try{
//         const userData = await User.findOne({email: email});
//         if(userData){
//             const { messages } = userData;
//             const message = messages[messageId];
//             if(message == undefined){
//                 return res.status(403).json({status: "403",message: "Message Unavailable"});
//             }
//             res.status(200).json({status: "200", message: message.desc});
//         }else{
//             res.status(401).json({status: "401", message: "This Email is not Registered"});
//         }
//     }catch(err){
//         console.log(err);
//     }
// });

router.post("/adminreply/:email/:id", async (req, res) => {
    const email = req.params.email;
    const messageId = req.params.id;
    try{
        const userData = await User.findOne({email: email});
        if(userData){
            const { messages } = userData;
            const message = messages[messageId];
            if(message == undefined){
                return res.status(403).json({status: 403, message: "Message Unavailable"});
            }
            const reply = new Reply({
                desc: req.body.reply
            });
            message.replies.push(reply);
            await userData.save();
            res.status(200).json({status: 200, message: {success: "Reply sent Successfully", reply: reply}});
        }else{
            res.status(401).json({status: 401, message: "This Email is not Registered"});
        }
    }
    catch(err){
        console.log(err);
    }
});

module.exports = router;