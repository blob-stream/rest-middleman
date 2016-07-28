var restify = require('restify')
var dirty = require('dirty')

var db = dirty('state.db')
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
  var blobs = require('./lib/generate-blobs')('assets/')
  var blobID = req.params.id
  var blob = blobs.find(blob => {
    if (blob.id === blobID) return true
  })
  res.send(blob)
  return next()
})
server.post('/blob/create', function (req, res, next) {
  res.send(req.params)
  return next()
})
server.post('/blob/vote/:id', function (req, res, next) {
  res.send(req.params)
  return next()
})

server.listen(62859, function () {
  console.log('%s listening at %s', server.name, server.url)
})
