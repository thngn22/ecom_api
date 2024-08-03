import express, { Express } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'

import env from '~/configs/environments'
import APIs_V1 from '~/routes/v1'

const app: Express = express()

// init middlewares
app.use(express.json())
app.use(helmet())
app.use(compression())

if (env.NODE_ENV === 'dev') {
  app.use(morgan('dev'))
}

// init db
require('~/dbs/init.mongodb')

// init routes
app.use('/api/v1', APIs_V1)

// handing handler

const server = app.listen(env.APP.PORT, () => {
  console.log(`Hello ${env.AUTHOR} Server is running on port ${env.APP.PORT}`)
})

process.on('SIGINT', () => {
  server.close(() => {
    console.log('Exit Server Express')
    process.exit(0)
  })
})
