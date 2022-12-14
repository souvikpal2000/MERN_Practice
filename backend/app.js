const express = require("express");
const app = express();
require("./db/connection");
require("dotenv").config();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const register = require("./routers/register");
const loginlogout = require("./routers/loginlogout");
const about = require("./routers/about");
const contact = require("./routers/contact");
const admin = require("./routers/admin");
app.use(register);
app.use(loginlogout);
app.use(about);
app.use(contact);
app.use(admin);

const PORT = 3030;
app.listen(PORT, (err) => {
    if(!err){
        return console.log("Server running at PORT 3030");
    }
    console.log(`Something went wrong : ${err}`)
})