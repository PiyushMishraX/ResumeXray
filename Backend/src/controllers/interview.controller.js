const pdfParse = require("pdf-parse") // to get content which is under the file
const generateInterviewReport = require("../services/ai.service")

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
    
}


module.exports = {
    generateInterviewReportController
}