const pdfParse = require("pdf-parse") // to get content which is under the file
const generateInterviewReport = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")

async function generateInterviewReportController(req, res) {
    const resumeFile = req.file
    // req.file is the uploaded file for .single and array in req.files for .array
  // req.body contains text fields

  const resumeContent = pdfParse(req.file.buffer)
  const { selfDescription , jobDescription } = req.body

  const interviewReportByAi = await generateInterviewReport({
    resume: resumeContent,
    selfDescription
  })

  const interviewReport = await interviewReportModel.create({
    user: req.user.id, // so that is why we pass id in the response in the auth controllers to create connections between in schemas // the id of logged in user
    resume: resumeContent,
    selfDescription,
    jobDescritption,
    ...interviewReportByAi // all the data/answer provided by ai/destructured
  })

  res.status(201).json({
    message: "Interview report generated successfully.",
    interviewReport,
  })
    
}


module.exports = {
    generateInterviewReportController
}