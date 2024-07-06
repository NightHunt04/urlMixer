const generateShortId = require('ssid')
const urlModel = require('../models/url')

// post and retrieve the short url id
async function handlePostURL(req, res) {
    const id = generateShortId(8)
    
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
        createdBy: req.user._id
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
    const createdBy = req.params.userId

    if(!createdBy) return res.status(400).json({ msg: 'no user id found' })

    const analytics = await urlModel.find({ createdBy })
    console.log(analytics)
    return res.status(200).json({ analytics: analytics })
}

module.exports = {
    handlePostURL,
    handleRedirectToOriginal,
    handleGetAnalytics
}