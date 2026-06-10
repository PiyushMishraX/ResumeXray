const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema} = require("zod-to-json-schema")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

// async function invokeGeminiAi(){ // for testing model working

//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         // contents: "Hello gemini ! Explain what is Interview  "
//         contents: "Hello gemini ! Explain what is Interview ( in 2 lines ) "
//     })

//     console.log(response.text)
// }

// module.exports = invokeGeminiAi // not for production


// this schema is different from the database 
// the description describes the quesry to ai model so the better it is the better result we will get
const interviewReportSchema = z.object({
    matchScore: z.number().description("A socre between 0 and 100 indicating how well the candidate's profile matches the job description"),
    technicalQuestions: z.array(z.object({
        question: z.string().description("The technical question can be asked in the interview"),
        interntion: z.string().description("The Intention behind asking this question"),
        answer: z.string().description("How to answer this question, what points to cover, what approach to take etc."), // the answers can be very big and if we asked ai model to generate it all it might give too much data and use our token limit more than needed so describing structure is best
    })).description("Technical questions that can be asked in the interview along with their interntion and how to answer them."),
    behavioralQuestions: z.array(z.object({
        question: z.string().description("The behavioral question can be asked in the interview"),
        interntion: z.string().description("The Intention behind asking this question"),
        answer: z.string().description("How to answer this question, what points to cover, what approach to take etc."), 
    })).description("Technical questions that can be asked in the interview along with their interntion and how to answer them."),
    skillGaps: z.array(z.object({
        skills: z.string().description("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).description("The severity of this skill gap, i.e. how important is this skill for the jon and how much it can impact the condidate's chances ")
    })).description("list of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().description("The day number is the preparation plan, starting from 1"),
        focus: z.string().description("THe main focus of this day in the preparation plan, e.g. data structure, system design, mock interviews etc"),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g read a specific book or article, solve a set of prob;ems, watch a videa etc.")
    })).description("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    // title: z.string().description("The title of the job for which the interview in generated"),
})

async function generateInterviewReport( resume, selfDescription, jobDescription) {

    // creating prompt with all the data
    const prompt = `Generate an interview report for a candidate with the following details:
                      Resume: ${resume}
                      Self Description: ${selfDescription}  
                      Job Description: ${jobDescription}
    `

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        // contents: prompt,
        contents: "",
        config: {
            responseMimeType: "application/json", // format details // json format
            responseJsonSchema: zodToJsonSchema(interviewReportSchema)
        }

    })

    console.log(JSON.parse(response.text))

    
}

module.exports = generateInterviewReport
