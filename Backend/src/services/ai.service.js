const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
// const { zodToJsonSchema} = require("zod-to-json-schema")
// //const { resume, selfDescription, jobDescription } = require('./temp_sample') // already imported it for passing in server.js 


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
// the describe describes the quesry to ai model so the better it is the better result we will get
// const interviewReportSchema = z.object({
//     matchScore: z.number().describe("A socre between 0 and 100 indicating how well the candidate's profile matches the job describe"),
//     technicalQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         interntion: z.string().describe("The Intention behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc."), // the answers can be very big and if we asked ai model to generate it all it might give too much data and use our token limit more than needed so describing structure is best
//     })).describe("Technical questions that can be asked in the interview along with their interntion and how to answer them."),
//     behavioralQuestions: z.array(z.object({
//         question: z.string().describe("The behavioral question can be asked in the interview"),
//         interntion: z.string().describe("The Intention behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc."), 
//     })).describe("Technical questions that can be asked in the interview along with their interntion and how to answer them."),
//     skillGaps: z.array(z.object({
//         skills: z.string().describe("The skill which the candidate is lacking"),
//         severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap, i.e. how important is this skill for the jon and how much it can impact the condidate's chances ")
//     })).describe("list of skill gaps in the candidate's profile along with their severity"),
//     preparationPlan: z.array(z.object({
//         day: z.number().describe("The day number is the preparation plan, starting from 1"),
//         focus: z.string().describe("THe main focus of this day in the preparation plan, e.g. data structure, system design, mock interviews etc"),
//         tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g read a specific book or article, solve a set of prob;ems, watch a videa etc.")
//     })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
//     // title: z.string().describe("The title of the job for which the interview in generated"),
// })

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

async function generateInterviewReport( resume, selfDescription, jobDescription) {

    // creating prompt with all the data
    const prompt = `Generate an interview report for a candidate with the following details:
                      Resume: ${resume}
                      Self Description: ${selfDescription}  
                      Job Description: ${jobDescription}

    `
    // const prompt = `Write the interviewReport format provided`

    const response = await ai.models.generateContent({
        // model: "gemini-2.5-flash",
        // model: "gemini-3.1-pro-preview",
        // model: "gemini-3-flash-preview",
        model: "gemini-3.1-flash-lite",
        // contents: "",
        contents: prompt,

        // config: { // changed 
        //     responseMimeType: "application/json", // format details // json format
        //     // responseJsonSchema: zodToJsonSchema(interviewReportSchema) 
        //     // responseJsonSchema = 
        // }
        // config: {
        //     responseFormat: { text: { mimeType: "application/json", 
        //     schema: zodToJsonSchema(interviewReportSchema) } },
        // },
        // config: { // changed 
        //     responseMimeType: "application/json", // format details // json format
        //     // responseSchema: zodToJsonSchema(interviewReportSchema)
        //     responseSchema: zodToJsonSchema(interviewReportSchema)
        //     // responseJsonSchema: interviewReportSchema
        // }


        // if (interviewReportSchema) {
        //     const jsonSchema = z.toJSONSchema(interviewReportSchema);

        //     console.log('[Gemini] Config Schema:', JSON.stringify(jsonSchema, null, 2));
        //     (config ).responseJsonSchema = jsonSchema;
        //     config.responseMimeType = 'application/json';
        // }

        config: { // changed 
            responseMimeType: "application/json", // format details // json format
            responseJsonSchema: z.toJSONSchema(interviewReportSchema) 
            
        }

    })
    
    // console.log(response.text)
    // console.log(JSON.parse(response.text)) 
    // console.log(JSON.stringify(JSON.parse(response.text)))  // now it shows what is in tasks array to 
    // console.dir(JSON.parse(response.text)) // can use dir too
    console.log(JSON.stringify(JSON.parse(response.text), null, 2)); // Converts that JavaScript object back into a string, but forces Node.js to unpack every single nested layer and format it with a 2-space indentation, bypassing the console's default depth limits.

    
}

module.exports = generateInterviewReport
