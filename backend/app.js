const express = require("express");
const app = express();
const auth = require("./middleware/auth");
require("./db/connection");

app.get("/", (req, res) => {
    res.send("Hello Souvik");
})

const PORT = 3030;
app.listen(PORT, (err) => {
    if(!err){
        return console.log("Server running at PORT 3030");
    }
    console.log(`Something went wrong : ${err}`)
})