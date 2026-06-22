const pdfParse = require("pdf-parse") // to get content which is under the file
const generateInterviewReport = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")

/**
 * @description Controller to generate interview report based on use self description, resume and job description
 */
async function generateInterviewReportController(req, res) {
    const resumeFile = req.file
    // req.file is the uploaded file for .single and array in req.files for .array
  // req.body contains text fields
  // data is send in form data format

//   const resumeContent = pdfParse(req.file.buffer) // error
  // const resumeContent = await (new pdfParse.PDFParse(req.file.buffer)).getText() // we need to send the file in Unit8Array format instead of binary
  const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()

  const { selfDescription , jobDescription } = req.body

  const interviewReportByAi = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription
  })

  // console.log(interviewReportByAi) // the original ai services generateInterviewReport function do not have returned the report so the interviewReportByAi is undifined , returning the report solves the problem

  const interviewReport = await interviewReportModel.create({
    user: req.user.id, // so that is why we pass id in the response in the auth controllers to create connections between in schemas // the id of logged in user
    // resume: resumeContent, // tthis might just have multiple pages but we want whole text content so using .text 
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
    ...interviewReportByAi // all the data/answer provided by ai/destructured
  })

  // console.log(interviewReport)

  res.status(201).json({
    message: "Interview report generated successfully.",
    interviewReport,
  })
    
}

async function getInterviewReportByIdController(req, res) {

  const { interviewId } = req.params

  const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

  if(!interviewReport) {
   return res.status(404).json({
    message: "Interview report not found"
   })
  }

  res.status(200).json({
    message: "Interview report fetched successfully",
    interviewReport
  })

}


module.exports = {
    generateInterviewReportController,
    getInterviewReportByIdController
}