const userModel = require("../models/user.model")

/**
 * @name registerUserController
 * @description register a new user, expects username, email and password in request body
 * @access Public
 */
async function registerUserController( req, res){

    const { username , email , password} =  req.body

    if(!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username, email and password",
        })
    }
 
    const ifUserAlreadyExists = await userModel.findOne({
        // $or can have 1 or more conditions in the array each object inside is a condition
        // the $or returns that after any of the condition is met 
        $or: [ {username} , {email}]
    })

    if(ifUserAlreadyExists) {
        /* isUserAlreadyExists.username == username <-- better message condition */
        // return res.status(400).json({
        //     message: "Account already exists with this email address or username",
        // })

        if(isUserAlreadyExists.username == username){
            return res.status(400).json({
                message: "Account already exists with this username",
            })
        } else {
            return res.status(400).json({
                message: "Account already exists with this email address",
            })
        }
    }

    
}


// module.exports = {}// empty object
module.exports = {
    registerUserController
}