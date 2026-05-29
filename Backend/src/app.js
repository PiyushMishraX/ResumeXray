const express = require("express")


const app = express();

app.use(express.json()) // middleware allowing us to read the data coming on request.body


module.exports = app;