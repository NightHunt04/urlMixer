const express = require('express')

const { handlePostURL, handleRedirectToOriginal, handleGetAnalytics } = require('../controllers/url')
const router = express.Router()

// POST /url <--- to generate short URL
router.post('/', handlePostURL)

// GET /:id <--- to redirect to the original URL by the short url
router.get('/:id', handleRedirectToOriginal)

// GET /analytics/:id <--- to get the analytics of the shortened url
router.get('/analytics/:sessionId', handleGetAnalytics)

module.exports = router