const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})
const authenticate = async(req,res,next) => {
    try{
        const token = req.cookie.jwtoken;
        const verify = jwt.verify(token,process.env.SECRET_KEY);
        console.log(verify)
    }catch(e){
        console.log(e)
    }
}

module.exports = authenticate;
