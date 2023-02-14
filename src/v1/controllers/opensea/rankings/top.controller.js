const { opensea } = require('../../../services')
const { redis } = require('../../../libs')

const findAll = async (req, res) => {
  try {
    const redis_key = `opensea_rankings_top_7d_cache`
    const cache = await redis.get(redis_key)
    if (cache) {
      return res.status(200).send({
        statusCode: 200,
        data: JSON.parse(cache),
        error: null
      })
    } else {
      const topCollections = await opensea.rankings.top.saveTopCollections()
      return res.status(200).send({
        statusCode: 200,
        data: topCollections,
        error: null
      })
    }
  } catch (e) {
    return res.status(400).status({
      statusCode: 400,
      data: null,
      error: {
        message: e?.message || String(e)
      }
    })
  }
}

module.exports = { findAll }
