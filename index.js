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
const free = require('./service/free')

app.set('port', (process.env.PORT || 5000))

// Create chat bot
const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
})

const sendList = (session) => {
  const listService = list(datasource)
  const msg = new builder.Message(session)
    .textFormat(builder.TextFormat.xml)
    .attachments(
      listService.list().map(entry => {
        const subtitle = entry.status ? `Status: \u274C ${entry.status} by ${entry.user}` : 'Status: \u2705'

        const buttons = [
          builder.CardAction.postBack(session, `!take:${entry.name}`, "Take")
        ]

        if(entry.status) {
          buttons.push(
            builder.CardAction.postBack(session, `!free:${entry.name}`, "Free")
          )
        }

        return new builder.HeroCard(session)
          .title(entry.name)
          .subtitle(subtitle)
          .buttons(buttons)
      })
    )
  session.send(msg)
}

const bot = new builder.UniversalBot(connector)

const intents = new builder.IntentDialog()
bot.dialog('/', intents)

intents.matches(/^\!list/i, [
  function (session) {
    sendList(session)
  }
])

intents.matches(/^\!take:.+/i, [
  function (session) {
    const takeService = take(datasource)
    const vmName = session.message.text.match(/\!take:(.+)/i)[1]
    const userName = session.message.user.name
    takeService.take(vmName, userName)
    sendList(session)
  }
])

intents.matches(/^\!free:.+/i, [
  function (session) {
    const freeService = free(datasource)
    const vmName = session.message.text.match(/\!free:(.+)/i)[1]
    freeService.free(vmName)
    sendList(session)
  }
])

app.post('/api/messages', connector.listen())

app.get('/', (req, res) => {
  res.json({status: 'ok'})
})

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'))
})
