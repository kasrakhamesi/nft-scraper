const { Router } = require('express')
const router = Router()

const { opensea } = require('../../controllers')

router.use('/', require('./trending.route'))

module.exports = router
