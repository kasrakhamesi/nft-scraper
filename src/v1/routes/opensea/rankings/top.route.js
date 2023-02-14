const { Router } = require('express')
const router = Router()

const { opensea } = require('../../../controllers')

router.get('/ticker/7d', opensea.rankings.top.findAll)

module.exports = router
