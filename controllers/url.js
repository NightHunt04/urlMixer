const generateShortId = require('ssid')
const urlModel = require('../models/url')

const { getUser } = require('../service/session')

// post and retrieve the short url id
async function handlePostURL(req, res) {
    const id = generateShortId(6)
    
    if(!req.body.url)
        return res.status(400).json({ msg: 'No url found' })

    const originalUrl = req.body.url
    const createHistory = {
        clicks: 0,
        history: []
    }
    await urlModel.create({
        shortId: id,
        redirectUrl: originalUrl,
        clickHistory: createHistory,
        createdBy: req.user._doc._id
    })

    return res.status(201).json({ shortId: id })
}

// redirect to the original url by the short url id
async function handleRedirectToOriginal(req, res) {
    const shortId = req.params.id

    if(!shortId)
        return res.status(400).json({ msg: 'Short ID not found' })

    const urlData = await urlModel.findOneAndUpdate({ shortId }, {
        $push: {
            'clickHistory.history': {
                timeStamp: Date.now(),
                ipAddr: req.ip
            }
        },
        $inc: {
            'clickHistory.clicks': 1
        }
    })

    res.redirect(urlData.redirectUrl)
}

// analytics
async function handleGetAnalytics(req, res) {
    // const createdBy = req.params.userId
    const userSessionId = req.params.sessionId
    // const userSessionId = req.headers?.session_id
    const user = getUser(userSessionId)
    
    if(!user) return res.json({ msg: 'no user found' })
    
    const createdBy = user._doc._id
    
    // if(!createdBy) return res.status(400).json({ msg: 'no user id found' })

    const analytics = await urlModel.find({ createdBy })
    console.log(analytics)
    return res.status(200).json({ analytics: analytics })
}

module.exports = {
    handlePostURL,
    handleRedirectToOriginal,
    handleGetAnalytics
}