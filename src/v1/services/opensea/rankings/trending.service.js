const OpenseaScraper = require('../../../../../local_modules/opensea-scraper')
const { redis } = require('../../../libs')

const options = {
  debug: false,
  logs: false,
  sort: true,
  additionalWait: 0,
  browserInstance: undefined
}
const saveTrendingCollections = async () => {
  try {
    const type = '24h' // possible values: "24h", "7d", "30d", "total"
    const chain = 'ethereum'
    const trending = await OpenseaScraper.rankings(type, chain, options, true)
    const redisKey = `opensea_rankings_trending_${type}_cache`
    await redis.set(
      redisKey,
      JSON.stringify(trending),
      'EX',
      Date.now() + 1000 * 15
    )
    return trending
  } catch (e) {
    console.log(e)
  }
}

const start = () => {
  saveTrendingCollections()
    .then(() => {
      setTimeout(start, 15000)
    })
    .catch(() => setTimeout(start, 15000))
}

start()

module.exports = { saveTrendingCollections }
