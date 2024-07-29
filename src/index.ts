import express, { Request, Response, NextFunction, Express } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
const env = require('~/configs/environments')

const app: Express = express()

// init middlewares
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

// init db
require('~/dbs/init.mongodb')

// init routes

// handing handler

const server = app.listen(env.APP.PORT, () => {
  console.log(`Hello ${env.AUTHOR} Server is running on port ${env.APP.PORT}`)
})

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: 'Welcome'
  })
})

process.on('SIGINT', () => {
  server.close(() => {
    console.log('Exit Server Express')
    process.exit(0)
  })
})
