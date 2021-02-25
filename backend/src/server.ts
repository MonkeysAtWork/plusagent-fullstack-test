#!/usr/bin/env node

import * as express from 'express'
import connectDB from './db/get-db-connection'
const path = require('path')
import sql from './db/sqlQueries'

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const state: any = {
  todos: []
}

const dbPath = path.join(__dirname, '/data/db/data.db')

try {
  const db = connectDB();
  const data = db.prepare(sql.getTodos).all();
  db.close()
  if (!data) {
    throw new Error('no data from database')
  }
  state.todos.push(...data)
} catch (err) {
  console.error('Some throwble with database')
  throw new Error(err)
}


app
  .use(express.static(path.join(__dirname, '..', 'build')))
  .get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  })
  .get('/api/todos', (req, res) => {
    const data = state.todos
      .slice()
      .sort((a: any, b: any) => new Date(a.date) < new Date(b.date) ? -1 : 1)
    res.json({ data })
  })
  .post('/api/todos', (req, res) => {
    const { description, date } = req.body.data
    const db = connectDB();
    const dbRes = db.prepare(sql.insertTodo).run(description, date)
    db.close()
    if (dbRes && dbRes.changes) {
      const data = { description, date, id: dbRes.lastInsertRowid }
      state.todos.push(data)
      res.json({ data })
      return
    }
    res.status(400).send('some thing wrong')
  })
  .use(function (req, res, next) {
    res.status(404).send('Sorry cant find that!')
  })

app.listen(3001, () => {
  console.log('App listening on localhost:3001')
})
