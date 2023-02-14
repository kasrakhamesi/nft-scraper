const { Router } = require('express')
const router = Router()

const { opensea } = require('../../../controllers')

router.get('/', opensea.rankings.trending.findAll)

module.exports = router
