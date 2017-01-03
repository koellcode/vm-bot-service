const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const builder = require('botbuilder')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// datasource
const datasource = require('./datasource')

// services
const list = require('./service/list')
const take = require('./service/take')

app.set('port', (process.env.PORT || 5000))

// Create chat bot
const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
})


const bot = new builder.UniversalBot(connector)

app.post('/api/messages', connector.listen())


app.get('/', (req, res) => {
  res.json({status: 'ok'})
})

app.get('/list', (req, res) => {
  const listService = list(datasource)
  res.json(listService.list())
})

app.post('/take/:vm', (req, res) => {
  const takeService = take(datasource)
  res.json(takeService.take(req.params.vm))
})

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'))
})
