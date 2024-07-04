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
        time: [{ timeStamp: Date.now() }]
    }

    await urlModel.create({
        shortId: id,
        redirectUrl: originalUrl,
        clickHistory: createHistory
    })

    return res.status(201).json({ shortId: id })
}

// redirect to the original url by the short url id
async function handleRedirectToOriginal(req, res) {
    const shortId = req.params.id

    if(!shortId)
        return res.status(400).json({ msg: 'Short ID not found '})

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

module.exports = {
    handlePostURL,
    handleRedirectToOriginal
}