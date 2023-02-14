const { Router } = require('express')
const router = Router()

router.use('/top', require('./top.route'))
router.use('/trending', require('./trending.route'))

module.exports = router
