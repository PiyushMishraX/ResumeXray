// file to create the auth realted apis

// const { Router } = reuqire('express')
// const authRouter = Router() // using destructured Router instead of express.Router

const express = require('express')
const authController = require('../controllers/auth.controller')

const authRouter = express.Router()

// it is js comment string or JSDoc comments

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerUserController )

/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access Public
 */
authRouter.post("/login", authController.loginUserController )

// @access pu
// both get and post methods are fine
/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */
authRouter.get("/logout", authController.logoutUserController )

// have to create middleware yo check user validitity , token validity , token blacklisting and getting user info 
// creating getme api to get requesting users details from the database for this we need the middleware also to tell if user looged in or not or which user is logged in
// access private because this api is for server functions

/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user-details
 * @access private
 */
authRouter.get("/get-me", authController.logoutUserController )

module.exports = authRouter;