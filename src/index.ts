import express, { Request, Response, NextFunction, Express } from 'express'
import morgan from 'morgan'
const env = require('~/configs/environments')

const app: Express = express()

// init middlewares
app.use(morgan('dev'))

// init db

// init routes

// handing handler

const server = app.listen(env.APP_PORT, () => {
  console.log(`Server is running on port ${env.APP_PORT}`)
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
