#!/usr/bin/env node

import { Integer } from 'better-sqlite3'
import Database = require('better-sqlite3')
import * as express from 'express'
const cors = require('cors')
const path = require('path')
import connectDB from './db/get-db-connection'
import sql from './db/sqlQueries'

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

let db: any

try {
  db = connectDB()
} catch (err) {
  console.error('Some throwble with database')
  throw new Error(err)
}

app
  .get('/api/todos', (req, res, next) => {
    const data = db.prepare(sql.getTodos).all()
    if (!data) {
      next('no data from database')
    }
    res.json({ data })
  })
  .post('/api/todos', (req, res, next) => {
    const { description, date } = req.body.data
    const dbRes = db.prepare(sql.insertTodo).run(description, date)
    if (dbRes && dbRes.changes) {
      const data = { description, date, id: dbRes.lastInsertRowid }
      res.json({ data })
      return
    }
    next('some thing wrong')
  })
  .use(function (req, res) {
    res.status(404).send('Sorry cant find that!')
  })
  .use(function (err: any, req: any, res: any, next: any) {
    console.error(err)
    res.status(500).send('Something failed!')
  })

app.listen(3001, () => {
  console.log('App listening on localhost:3001')
})
