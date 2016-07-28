var fs = require('fs')
var dirty = require('dirty')
var generateEvents = require('./generate-events')

var imgPath = 'assets/'
var dbPath = 'state.db'

if (fs.existsSync(dbPath)) {
  console.log('database exists: ' + dbPath)
  process.exit(0)
}

console.log('no database found, prepopulating... ')

var events = generateEvents(imgPath)
var db = dirty(dbPath)

db.on('load', () => {
  db.set('events', events)
})
