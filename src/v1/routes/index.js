const express = require('express')
const router = express.Router()

router.use('/opensea', require('./opensea'))

module.exports = router
