var fs = require('fs')
var flatfile = require('flat-file-db')
var generateEvents = require('./generate-events')
var generateBlobs = require('./generate-blobs')

var imgPath = 'assets/'
var dbPath = 'state.db'

if (fs.existsSync(dbPath)) {
  console.log('database exists: ' + dbPath)
  process.exit(0)
}

console.log('no database found, prepopulating... ')

var blobs = generateBlobs(imgPath)
var events = generateEvents(imgPath)
var db = flatfile(dbPath)

db.on('open', () => {
  db.put('events', events)
  db.put('blobs', blobs)
  console.log('... done')
})
