const mongoose = require("mongoose")

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to Database");
        
    } catch (err) {
        console.log(err); // shortcut vs code to write console.log --> clg  ( or log but clg is more targated)
        
        // console.log("error");
        
        
    }
    
}

module.exports = connectToDB