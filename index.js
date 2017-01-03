const express = require('express')
const app = express()

// datasource
const datasource = require('./datasource')

// services
const list = require('./service/list')


app.set('port', (process.env.PORT || 5000))

app.get('/', (req, res) => {
  res.json({status: 'ok'})
})

app.get('/list', (req, res) => {
  res.json(list(datasource))
})

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'))
})
