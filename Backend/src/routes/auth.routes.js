// file to create the auth realted apis

// const { Router } = reuqire('express')
// const authRouter = Router() // using destructured Router instead of express.Router

const express = reuqire('express')

const authRouter = express.Router()

// it is js comment string or JSDoc comments

/**
 * @route POST
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", )

module.exports = authRouter;