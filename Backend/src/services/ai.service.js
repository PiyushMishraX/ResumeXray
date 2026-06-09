const { GoogleGenAI } = require("@google/genai")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

async function invokeGeminiAi(){ // for testing model working

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        // contents: "Hello gemini ! Explain what is Interview  "
        contents: "Hello gemini ! Explain what is Interview ( in 2 lines ) "
    })

    console.log(response.text)
}

module.exports = invokeGeminiAi // not for production