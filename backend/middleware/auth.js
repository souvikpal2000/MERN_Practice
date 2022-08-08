const jwt = require("jsonwebtoken");
const User = require("../db/models/users");

const auth = async (req, res, next) => {
    if(!req.cookies.jwt){
        return res.json({error: "Unauthorized User"});
    }
    const token = req.cookies.jwt;
    try{
        const verify = jwt.verify(token, process.env.SECRET_KEY);
        const checkMail = await User.findOne({email: Object.values(verify)[2].email});
        if(checkMail){
            next();
        }
    }catch(err){
        return res.json({error: "Unauthorized User"});
    }
}

module.exports = auth;