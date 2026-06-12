require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")

const { resume , selfDescription, jobDescription } = require("./src/services/temp_sample")
const generateInterviewReport = require("./src/services/ai.service")

const dns = require("dns")
dns.setServers(["1.1.1.1","8.8.8.8"]);


connectToDB()

// const invokeGeminiAi = require("./src/services/ai.service")
// invokeGeminiAi() // no tfor productions

generateInterviewReport( resume, selfDescription, jobDescription )

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})