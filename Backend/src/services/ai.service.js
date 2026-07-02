const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
// const { zodToJsonSchema } = require("zod-to-json-schema") //not needednow
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})


// const interviewReportSchema = z.object({
//     // matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"), // fixing 0 in all output probelem
//     // matchScore: z.number().describe(
//     // "An integer between 0 and 100 indicating how well the candidate matches. " +
//     //  "CRITICAL: Output as a raw JSON number, NOT a string. Do NOT wrap this value in quotation marks."
//     // ),
//     // matchScore: z.coerce.number().min(0).max(100).describe("A score between 0 and 100 indicating how well the candidate's profile matches the job description"),
//     // matchScore: z.string().describe("Give A real score between 1 to 100 indicating how well the candidate's profile matches the job describe , take proper time"),
//     // // the match score is given 0 by ai because it doesn't get proper time to analyse so it just gives so ( put match score at the last of the schema to resolve this issue)
//     technicalQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intention: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
//     behavioralQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intention: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
//     skillGaps: z.array(z.object({
//         skill: z.string().describe("The skill which the candidate is lacking"),
//         severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
//     })).describe("List of skill gaps in the candidate's profile along with their severity"),
//     preparationPlan: z.array(z.object({
//         day: z.number().describe("The day number in the preparation plan, starting from 1"),
//         focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
//         tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
//     })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
//     title: z.string().describe("The title of the job for which the interview report is generated"),
//     // matchScore: z.string().describe("Give A real score between 1 to 100 indicating how well the candidate's profile matches the job describe , take proper time"),
//     matchScore: z.number().describe("A real score between 0 to 100 indicating how well the candidate's profile matches the job describe , take proper time"),
// })


const interviewReportSchema = z.object({
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    }))
    .min(5) // Programmatic validation constraint
    .describe("Provide a comprehensive list of EXACTLY 5 to 7 highly relevant technical questions that can be asked in the interview, along with their intention and how to answer them."),
    
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    }))
    .min(5)
    .describe("Provide a comprehensive list of EXACTLY 5 to 7 behavioral questions that can be asked in the interview, along with their intention and how to answer them."),
    
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day"),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day")
    }))
    .min(5)
    .describe("A comprehensive, day-wise preparation plan spanning EXACTLY 5 to 7 days for the candidate to follow."),
    title: z.string().describe("The title of the job for which the interview report is generated"),
    // matchScore: z.string().describe("Give A real score between 1 to 100 indicating how well the candidate's profile matches the job describe , take proper time"),
    matchScore: z.number().describe("A real score between 0 to 100 indicating how well the candidate's profile matches the job describe , take proper time"),
})

async function generateInterviewReport( resume, selfDescription, jobDescription) {

    const prompt = `Generate an interview report for a candidate with the following details:
                      Resume: ${resume}
                      Self Description: ${selfDescription}  
                      Job Description: ${jobDescription}

    `
    const response = await ai.models.generateContent({

        model: "gemini-3.1-flash-lite",
        // model: "gemini-2.5-flash-lite",
        // model: "gemini-2.5-flash",
        contents: prompt,


        config: { 
            responseMimeType: "application/json",
            responseJsonSchema: z.toJSONSchema(interviewReportSchema) 

        }

    })
    
    console.log("DIRRR");    
    console.dir( response)
    console.log("REPOSNE " )
    console.log(response);
    
   console.log("response.text" + response.text)
    console.log(JSON.stringify(JSON.parse(response.text), null, 2)); 

    return JSON.parse(response.text)

    // const rawData = JSON.parse(response.text);
    // const validatedData = interviewReportSchema.parse(rawData);

    // console.log(JSON.stringify(validatedData, null, 2)); 

    // return validatedData;

    
}


/* PDF GENERATION FEATURE    */
async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setContent(htmlContent, {
        waitUntil: "networkidle0",
    })

    // pdf file data is returned in buffer format from pupeteer
    const pdfBuffer = await page.pdf({ format: "A4"})

    await browser.close() // intuitions on why this line is required 
    // this line is to properly terminate the Chromium browser process and free up system resources. 

    return pdfBuffer
    
    
}

async function generateResumePdf({resume, selfDescription, jobDescription}) {
    // we need to generate html through ai  and with the html and puppeteer we will generate pdf
    
    const resumePdfSchema = z.onject({
        html: z.string().describe("The HTML content of th resume which can be converted to PDF using a library like puppeteer ")
    })

    const prompt = `Generate a resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                    the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                    `

    const response = await ai.models.generateContent({

        model: "gemini-3.1-flash-lite",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: z.toJSONSchema(resumePdfSchema)
        }

    })

    // return JSON.parse(response.text)

    const jsonContent = JSON.parse(response.text)


    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer


}
module.exports = { generateInterviewReport, generateResumePdf }
