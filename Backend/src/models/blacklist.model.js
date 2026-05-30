const mongoose = require('mongoose')

const blackListTokenSchema = new mongoose.Schema({
    token : {
        type: String,
        reuqired: [ true , "token is required to be added in blacklist"]
    }
}, {
    timestamps: true // databse tracks when the token is balcklisted ( or added in the balck list model)
})

const tokenBlacklistModel = mongoose.model("blacklistTokens", blackListTokenSchema)

module.exports = tokenBlacklistModel