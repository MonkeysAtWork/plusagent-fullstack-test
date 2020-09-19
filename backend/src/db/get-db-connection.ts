import { open, Database } from 'sqlite'

let connection: Database

export const getDbConnection = async () => {
  if (!connection) {
    connection = await open({
      filename: './data/db/data.db',
      driver: require('sqlite3').Database
    })
  }

  return connection
}
