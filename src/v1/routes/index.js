const { Router } = require('express')
const router = Router()

router.use('/opensea', require('./opensea'))

module.exports = router
