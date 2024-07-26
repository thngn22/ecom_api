require('dotenv/config')

const env: Object = {
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,

  AUTHOR: process.env.AUTHOR
}

module.exports = env
