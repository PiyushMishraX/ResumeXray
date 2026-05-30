const jwt = require("jsonwebtoken") // to verify the token

function authUser(req, res, next) {

    const token = req.cokies.token
    
    if(!token) {
        return res.status.json({
            message: "Token not provided.",
        })
    }

    // if token found verify it AND store decoded(standard name for this data) data // if token not exists or is wrong than handle the thrown erroe
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // if we get data than add that in base request // created the user property in request
        req.user = decoded
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token."
        })
        
    }

}

module.exports = { authUser}