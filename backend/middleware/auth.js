const jwt = require("jsonwebtoken");
const User = require("../db/models/users");

const auth = async (req, res, next) => {
    if(!req.cookies.jwt){
        return res.json({status: 502, error: "Token not Found : Unauthorized User"});
    }
    const token = req.cookies.jwt;
    try{
        const verify = jwt.verify(token, process.env.SECRET_KEY);
        const data = await User.findOne({email: Object.values(verify)[2].email});
        if(data){
            req.rootUser = data;
            next();
        }
    }catch(err){
        return res.json({status: 401, error: "Invalid Token : Unauthorized User"});
    }
}

module.exports = auth;