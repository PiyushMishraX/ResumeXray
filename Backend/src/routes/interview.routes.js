const express = require('express')
const authMiddleware = require("../middlewares/auth.middleware") // to check logged in user
const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")
const { generateResumePdf } = require('../services/ai.service')


const interviewRouter = express.Router()

/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user self description, resume pdf and job description.
 * @access private
 */
interviewRouter.post("/", authMiddleware.authUser, upload.single("resume") , interviewController.generateInterviewReportController )
// auth user passes to the controller only when a logged in user is trying to do the operations
// multer middleware after the auth , the files comes under name resume in the req 

// specific report generator 
/** 
 * @rotue GET /api/interview/report/:interviewId
 * @description get interview report by interviewId.
 * @access private
*/
interviewRouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterviewReportByIdController)

// api to fetch all the reports created till now for use
/**
 * @route GET /api/interview/
 * @description get all interview reports of logged in user.
 * @access private
 */
interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterviewReportsController )

/**
 * @route POST /api/interview/resume/pdf
 * @description generate rsume pdf on the basis of user self description, resume and job description.
 * @access private
 */
interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware.authUser, interviewController.genrerateResumePdfController)


module.exports = interviewRouter