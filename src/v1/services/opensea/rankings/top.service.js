const OpenseaScraper = require('../../../../../local_modules/opensea-scraper')
const { redis } = require('../../../libs')

const options = {
  debug: false,
  logs: false,
  sort: true,
  additionalWait: 0,
  browserInstance: undefined
}
const saveTopCollections = async () => {
  try {
    const type = '7d' // possible values: "24h", "7d", "30d", "total"
    const chain = 'ethereum'
    const rankings = await OpenseaScraper.rankings(type, chain, options, false)
    const redisKey = `opensea_rankings_top_${type}_cache`
    await redis.set(
      redisKey,
      JSON.stringify(rankings),
      'EX',
      Date.now() + 1000 * 15
    )
    return rankings
  } catch (e) {
    console.log(e)
  }
}

const start = () => {
  saveTopCollections()
    .then(() => {
      setTimeout(start, 15000)
    })
    .catch(() => setTimeout(start, 15000))
}

start()

module.exports = { saveTopCollections }
