const jwt = require("jsonwebtoken") // to verify the token
const tokenBlacklistModel = require("../models/blacklist.model")

async function authUser(req, res, next) {

    const token = req.cookies.token
    // console.log(1)// fpr testing
    
    if(!token) {
        return res.status(401).json({
            message: "Token not provided.",
        })
        // console.log(2.1)
    }


    const isTokenBlacklisted = await tokenBlacklistModel.findOne({
        token
    })
        
    if(isTokenBlacklisted) {
        res.status(401).json({
            message: "token is invalid"
        })
    }



    // if token found verify it AND store decoded(standard name for this data) data // if token not exists or is wrong than handle the thrown erroe
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(2.2)

        // if we get data than add that in base request // created the user property in request
        req.user = decoded

        next();
    } catch (err) {
        // console.log(2.3)
        return res.status(401).json({
            message: "Invalid token."
        })
        
    }

}

module.exports = { authUser}