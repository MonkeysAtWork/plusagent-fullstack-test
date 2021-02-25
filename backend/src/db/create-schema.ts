#!/usr/bin/env node

import * as connectDB from 'better-sqlite3'
const path = require('path')
import * as fs from 'fs'
import sql from './sqlQueries'


const dbPath = path.join(__dirname, '../..', '/data/db/data.db')

const createSchema = async () => {
  const db = connectDB(dbPath)
  db.prepare(sql.createTodosTable).run()
  db.close()
}

createSchema()
