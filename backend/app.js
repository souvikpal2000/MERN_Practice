const express = require("express");
const app = express();
require("./db/connection");

app.use(express.json());

const register = require("./routers/register");
const login = require("./routers/login");
app.use(register);
app.use(login);


const PORT = 3030;
app.listen(PORT, (err) => {
    if(!err){
        return console.log("Server running at PORT 3030");
    }
    console.log(`Something went wrong : ${err}`)
})