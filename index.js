var restify = require('restify')
var flatfile = require('flat-file-db')

var db = flatfile.sync('state.db')
var server = restify.createServer({
  name: 'blob-stream-rest-server',
  version: '0.1.0'
})

server.use(restify.acceptParser(server.acceptable))
server.use(restify.queryParser())
server.use(restify.bodyParser())

server.get('/', function (req, res, next) {
  res.send('rest api for mwa')
  return next()
})

server.get('/events/recent/:amount', function (req, res, next) {
  var events = db.get('events')
  res.send(events.slice(0, req.params.amount))
  return next()
})

server.get('/blob/get/:id', function (req, res, next) {
  var blobs = db.get('blobs')
  var blob = blobs.find(blob => {
    if (blob.id === req.params.id) return true
  })
  if (!blob) {
    var keys = []
    blobs.forEach((_, key) => keys.push(key))
    res.send('blob unknown, available keys: ' + keys)
    return next()
  }
  res.send(blob)
  return next()
})

server.post('/blob/create', function (req, res, next) {
  var blobs = db.get('blobs')
  var received = blobs.find(blob => {
    if (blob.id === req.params.id) return true
  })
  if (received) {
    res.send('ok, duplicate')
    return next()
  }

  blobs.push(req.params)
  db.put('blobs', blobs)

  var events = db.get('events')
  events.unshift({
    verb: 'newBlob',
    blobID: req.params.id
  })
  db.put('events', events)

  res.send('ok')
  return next()
})

server.post('/blob/vote', function (req, res, next) {
  var events = db.get('events')
  events.unshift(req.params)
  db.put('events', events)

  res.send('ok')
  return next()
})

server.listen(62859, function () {
  console.log('%s listening at %s', server.name, server.url)
})
