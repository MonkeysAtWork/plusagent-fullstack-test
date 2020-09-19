#!/usr/bin/env node

import * as express from 'express'

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Put your route handlers here

app.listen(3001, () => {
  console.log('App listening on localhost:3001')
})
