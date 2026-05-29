const userModel = require("../models/user.model")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

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

    const hash = await bcrypt.hash(password, 10)

    const userr = await userModel.create({
        username, // username is username
        email, // email is email
        password: hash, // password stored as hash
    })

    const token = jwt.sign(

        {id: user._id, username: user.username},
        process.env.JWT_SECRET,
        { expiresIn: "1d"},
    )

    res.cookie("token", token)

    // 201--> new resource(user) create [in backend language the use is a resource too]
    res.status(201).json({
        message: "User registered successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
        // token --> not sending bcz already saving in cookies
        // we may send it if it was mobile application not web

    })

}


// module.exports = {}// empty object
module.exports = {
    registerUserController
}