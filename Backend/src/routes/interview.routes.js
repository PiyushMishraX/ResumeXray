const express = require('express')
const authMiddleware = require("../middlewares/auth.middleware") // to check logged in user


const interviewRouter = express.Router()

/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user self description, resume pdf and job description.
 * @access private
 */
interviewRouter.post("/", authMiddleware.authUser,  )
// auth user passes to the controller only when a logged in user is trying to do the operations


module.exports = interviewRouter