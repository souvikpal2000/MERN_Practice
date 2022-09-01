const mongoose = require("mongoose");

const unRegUserMessageSchema = new mongoose.Schema({
    desc:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const unRegUserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    messages: [unRegUserMessageSchema]
});

const UnRegUserMessage = new mongoose.model("unRegUserMessage", unRegUserMessageSchema);
const UnRegUser = new mongoose.model("unRegUser", unRegUserSchema);

module.exports = { UnRegUserMessage, UnRegUser };