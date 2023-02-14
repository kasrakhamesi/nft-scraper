const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('morgan')
const workerFarm = require('worker-farm')
require('dotenv').config()
/*
const { Builder, Browser, By, Key, until } = require('selenium-webdriver')

;(async function example() {
  let driver = await new Builder().forBrowser(Browser.FIREFOX).build()
  try {
    await driver.get('https://www.google.com/ncr')
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN)
    await driver.wait(until.titleIs('webdriver - Google Search'), 1000)
  } finally {
    await driver.quit()
  }
})()
*/
const options = {
  debug: false,
  logs: false,
  sort: true,
  additionalWait: 0,
  browserInstance: undefined
}
const OpenseaScraper = require('./local_packages/opensea-scraper')
const q = async () => {
  const type = '24h' // possible values: "24h", "7d", "30d", "total"
  const chain = 'ethereum'
  const ranking = await OpenseaScraper.rankings(type, chain, options)
  console.log(ranking)
}

q().then(console.log).catch(console.log)

app.use('*', (req, res) => {
  res.status(404).send({
    statusCode: 404,
    data: null,
    error: {
      message: 'صفحه یافت نشد'
    }
  })
})

app.listen(process.env.PORT)
