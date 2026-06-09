require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")

const dns = require("dns")
dns.setServers(["1.1.1.1","8.8.8.8"]);


connectToDB()

const invokeGeminiAi = require("./src/services/ai.service")
invokeGeminiAi() // no tfor productions

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})