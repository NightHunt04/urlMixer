const express = require('express')

const { handlePostURL, handleRedirectToOriginal } = require('../controllers/url')
const router = express.Router()

// POST /url <--- to generate short URL
router.post('/', handlePostURL)

// GET /:id <--- to redirect to the original URL by the short url
router.get('/:id', handleRedirectToOriginal)

module.exports = router