require('./db/mongoose')
const UserRouter = require('./router/user')
const HackerRouter = require('./router/hacker')
const express = require('express')

const app = express()

app.use(express.json())
app.use(UserRouter)
app.use(HackerRouter)

module.exports = app