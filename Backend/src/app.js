const express = require("express")


const app = express();

app.use(express.json()) // middleware allowing us to read the data coming on request.body

/* require all the routes here */
const authRouter = require("./routes/auth.routes")

// /api.auth is prefix to access all auth related apis
// app.use("/api/auth", authRouter)

/* using all the routes here */
app.use("/api/auth", authRouter)


module.exports = app;