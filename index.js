const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('morgan')
const workerFarm = require('worker-farm')
require('dotenv').config()

app.use(cors())
app.use(logger('dev'))

const services = {
  topCollections: workerFarm(
    require.resolve('./src/v1/services/opensea/rankings/top.service')
  ),
  trendingCollections: workerFarm(
    require.resolve('./src/v1/services/opensea/rankings/trending.service')
  )
}

services.topCollections('hello', (err) => {
  if (err) console.log(err)
})

services.trendingCollections('hello', (err) => {
  if (err) console.log(err)
})

app.use('/v1', require('./src/v1/routes'))

app.use('*', (req, res) => {
  res.status(404).send({
    statusCode: 404,
    data: null,
    error: {
      message: '404 Not Found'
    }
  })
})

app.listen(process.env.PORT)
