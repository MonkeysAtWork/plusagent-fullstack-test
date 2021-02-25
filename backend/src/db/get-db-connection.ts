import * as connectDB from 'better-sqlite3'
const path = require('path')

const dbPath = path.join(__dirname, '../..', '/data/db/data.db')

export default () => {
  return connectDB(dbPath, { fileMustExist: true });
}

