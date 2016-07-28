var restify = require('restify')

var assetPrefix = 'assets/'
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
  var events = require('./generate-events')(assetPrefix)
  res.send(events)
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
