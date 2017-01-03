const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// datasource
const datasource = require('./datasource')

// services
const list = require('./service/list')
const take = require('./service/take')

app.set('port', (process.env.PORT || 5000))

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

app.post('/messaging', (req, res) => {
  res.json(req.body)
})

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'))
})
