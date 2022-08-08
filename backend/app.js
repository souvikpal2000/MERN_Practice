const express = require("express");
const app = express();
require("./db/connection");
require("dotenv").config();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const register = require("./routers/register");
const login = require("./routers/login");
const about = require("./routers/about");
app.use(register);
app.use(login);
app.use(about);

const PORT = 3030;
app.listen(PORT, (err) => {
    if(!err){
        return console.log("Server running at PORT 3030");
    }
    console.log(`Something went wrong : ${err}`)
})