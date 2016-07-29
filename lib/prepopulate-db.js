var flatfile = require('flat-file-db')
var generateEvents = require('./generate-events')
var generateBlobs = require('./generate-blobs')

var imgPath = 'assets/'
var dbPath = 'state.db'

var db = flatfile(dbPath)
db.clear(() => {
  var blobs = generateBlobs(imgPath)
  var events = generateEvents(blobs)
  var db = flatfile(dbPath)

  db.on('open', () => {
    db.put('events', events)
    db.put('blobs', blobs)
  })
  db.on('drain', () => {
    console.log('db initialized')
  })
})
