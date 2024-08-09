require('dotenv/config')

const isDev = process.env.NODE_ENV === 'dev'

if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
  throw new Error('JWT secrets are not defined in the environment variables')
}

const env = {
  APP: {
    PORT: isDev ? process.env.DEV_APP_PORT : process.env.PRO_APP_PORT
  },
  DB: {
    HOST: isDev ? process.env.DEV_DB_HOST : process.env.PRO_DB_HOST,
    PORT: isDev ? process.env.DEV_DB_PORT : process.env.PRO_DB_PORT,
    NAME: isDev ? process.env.DEV_DB_NAME : process.env.PRO_DB_NAME
  },

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,

  NODE_ENV: process.env.NODE_ENV || 'dev',
  AUTHOR: process.env.AUTHOR || 'unknowns'
}

export default env
