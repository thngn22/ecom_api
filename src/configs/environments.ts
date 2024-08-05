require('dotenv/config')

const isDev = process.env.NODE_ENV === 'dev'

const env = {
  APP: {
    PORT: isDev ? process.env.DEV_APP_PORT : process.env.PRO_APP_PORT
  },
  DB: {
    HOST: isDev ? process.env.DEV_DB_HOST : process.env.PRO_DB_HOST,
    PORT: isDev ? process.env.DEV_DB_PORT : process.env.PRO_DB_PORT,
    NAME: isDev ? process.env.DEV_DB_NAME : process.env.PRO_DB_NAME
  },

  NODE_ENV: process.env.NODE_ENV || 'dev',
  AUTHOR: process.env.AUTHOR || 'unknowns'
}

export default env
