const pdfParse = require("pdf-parse") // to get content which is under the file
const { generateInterviewReport, generateResumePdf} = require("../services/ai.service")
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

/**
 * @description Controller to get interview report by interviewId.
 */
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

/**
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res) {

  const interviewReports = await interviewReportModel.find({ user: req.user.id}).sort({ createdAt: -1}).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan") 
  // -1 in .sort sorts in descending order // -element removes that elements fethcing in the interviewReports
  // we shows only title ( mainly ) // and Id etc for later fetching

  res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
  
}

/**
 * @description Controller to generate resume PDF based on user self description , resume and job description.
 */

async function genrerateResumePdfController(req, res) {
  const { interviewReportId } = req.params

  const interviewReport = await interviewReportModel.findById(interviewReportId)

  if(!interviewReport){
    return res.status(404).json({
      message: "Interview reort not found."
    })
  }

  const { resume, jobDescription, selfDescription } = interviewReport

  const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription})

  // this part creates resume pdf from the html format genrated on above buffer
  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
  })

  res.send(pdfBuffer) // send not sent

}

module.exports = {
    generateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    genrerateResumePdfController
}