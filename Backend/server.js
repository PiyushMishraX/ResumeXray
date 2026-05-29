require("dotenv").config()
const app = require("./src/app")

// const dns = require("dns")
// dns.setServers(["1.1.1.1","8.8.8.8"]);


app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})