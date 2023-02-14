const { Router } = require('express')
const router = Router()

router.use('/trending', require('./trending.route'))

module.exports = router
