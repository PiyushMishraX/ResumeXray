const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: [ true, "username already taken"], // error message for already taken
        required: true,
    },

    email: {
        type: String,
        unique: [true, "Account already exists with this email address"],
        required: true,
    },

    password: {
        type: String,
        required: true,
    }
})

// model method of mongoose telling connection name where the user data is being stored
const userModel = mongoose.model("users", userSchema)

module.exports = userModel

