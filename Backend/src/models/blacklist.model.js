const mongoose = require('mongoose')

const blackListTokenSchema = new mongoose.Schema({
    token : {
        type: String,
        reuqired: [ true , "token is required to be added in blacklist"]
    }
}, {
    timestamps: true // databse tracks when the token is balcklisted ( or added in the balck list model)
})


// createdAt is the first index the mongo db runs a background thread every 60 seconds the index at 1 get checked ( 1 index means the value added first) then if it's time have ended (1 day ) then it get deleted
// after 1 day our jwt token itself expires and can not be used so deleting it from blacklist model will free up space
blackListTokenSchema.index({ createdAt:1}, {
    expireAfterSeconds: 60* 60* 24* 1, // expire in one day
})

const tokenBlacklistModel = mongoose.model("blacklistTokens", blackListTokenSchema)

module.exports = tokenBlacklistModel