const userModel = require("../models/user.model")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")

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
 
    const isUserAlreadyExists = await userModel.findOne({
        // $or can have 1 or more conditions in the array each object inside is a condition
        // the $or returns that after any of the condition is met 
        $or: [ {username} , {email}]
    })

    if(isUserAlreadyExists) {
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

    const user = await userModel.create({
        username, // username is username
        email, // email is email
        password: hash, // password stored as hash
    })

    const token = jwt.sign(

        {id: user._id, username: user.username},
        process.env.JWT_SECRET,
        { expiresIn: "1d"},
    ) // tokens are unique because they have issued at  timestamps which adds the unique time for the user , token generation 

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


/**
 * @name loginUserController
 * @description login a new user, expects email and password in request body
 * @access Public
 */
async function loginUserController( req, res){

    const { email , password } = req.body 

    const user = await userModel.findOne({
        email
    })

    if(!user){
        return res.status(400).json({
            message: "Invalid email or password",
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid ){
        return res.status(400).json({
            message: "Invalid email or password",
        })
    }

    const token = jwt.sign(
        {id: user._id, username: user.username},
        process.env.JWT_SECRET,
        { expiresIn: "1d"},
    )

    res.cookie("token", token)
    // res.cookie("testCookie", "hello") , testing cookieClear

    res.status(200).json({
        message: "User loggedIn successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
     
}


/**
 * @name logoutUserController
 * @description clear token from user cookie and add the token in blacklist
 * @access Public
 */
async function logoutUserController( req, res){
    const token = req.cookies.token // middleware required to read cookies ( cookieParser in  app.js)

    if(token) {
        await tokenBlacklistModel.create({ token })
        // add token to balck list model
    }

    // res.clearCookie() // clears everything but not working
    res.clearCookie("token") // clears/remove the token , have to manually write what to remove , ( if waht to remove token write token )

    res.status(200).json({
        message: "User logged out successfully"
    })

}


/**
 * @name getMeController
 * @description get the current logged in user deatils.
 * @access private
 */
async function getMeController( req, res){

    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "User details fetched successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

// module.exports = {}// empty object
module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController,
}