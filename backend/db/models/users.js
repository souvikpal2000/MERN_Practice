const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    desc:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    work: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    messages: [messageSchema]
});

const Message = new mongoose.model("message", messageSchema);
const User = new mongoose.model("user", userSchema);

module.exports = { Message, User };