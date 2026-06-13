const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express();

app.use(express.json()) // middleware allowing us to read the data coming on request.body
app.use(cookieParser()) // middleware to read the cookies
app.use(cors({
    origin: "http://localhost:5173", // orign for now is localhost
    credentials: true // credentials true to handle cookies data
}))

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")

// /api.auth is prefix to access all auth related apis
// app.use("/api/auth", authRouter)

/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)


module.exports = app;