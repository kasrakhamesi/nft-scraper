const { Router } = require('express')
const router = Router()

router.use('/rankings', require('./rankings'))

module.exports = router
