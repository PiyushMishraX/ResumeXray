const express = require('express')
const authMiddleware = require("../middlewares/auth.middleware") // to check logged in user
const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")


const interviewRouter = express.Router()

/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user self description, resume pdf and job description.
 * @access private
 */
interviewRouter.post("/", authMiddleware.authUser, upload.single("resume") , interviewController.generateInterviewReportController )
// auth user passes to the controller only when a logged in user is trying to do the operations
// multer middleware after the auth , the files comes under name resume in the req 


module.exports = interviewRouter