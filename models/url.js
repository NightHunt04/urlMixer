const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true
    },
    clickHistory: {
        clicks: {
            type: Number,
            required: true
        },
        history: [
            {
                timeStamp: {
                    type: Number
                },
                ipAddr: {
                    type: String
                }
            }
        ]
    }
})

const urlModel = mongoose.model('urlShortner', urlSchema)

module.exports = urlModel