var flatfile = require('flat-file-db')
var generateBlobs = require('./generate-blobs')
var generateEvents = require('./generate-events')
var generateVotes = require('./generate-votes')

var imgPath = 'assets/'
var dbPath = 'state.db'

var db = flatfile(dbPath)
db.clear(() => {
  var blobs = generateBlobs(imgPath)
  var events = generateEvents(blobs)
  var votes = generateVotes(blobs)
  var db = flatfile(dbPath)
  votes.forEach(vote => events.unshift(vote))

  db.on('open', () => {
    db.put('events', events)
    db.put('blobs', blobs)
  })
  db.on('drain', () => {
    console.log('db initialized')
  })
})
