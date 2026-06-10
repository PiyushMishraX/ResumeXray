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
    technicalQuestions: z.array(z.object({
        question: z.string().description("The technical question can be asked in the interview"),
        interntion: z.string().description("The Intention behind asking this question"),
        answer: z.string().description("How to answer"),
    }))
})

async function generateInterviewReport( resume, selfDescription, jobDescription) {


    
}


