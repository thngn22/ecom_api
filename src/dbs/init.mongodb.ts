import mongoose = require('mongoose')
import env from '~/configs/environments'

const connectString = `mongodb://${env.DB.HOST}:${env.DB.PORT}`

class Database {
  private static instance: Database

  private constructor() {
    this.connect()
  }

  private connect(type: string = 'mongodb'): void {
    if (1 === 1) {
      mongoose.set('debug', true)
      mongoose.set('debug', { color: true })
    }

    mongoose
      .connect(connectString, { dbName: env.DB.NAME })
      .then(() => console.log(`Connected to MongoDB Success!!!`))
      .catch((err: Error) => console.log(`Error Connect!`, err))
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }

    return Database.instance
  }
}

export default Database.getInstance()
