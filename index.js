var restify = require('restify')
var fs = require('fs')

var assetPrefix = 'assets/'
var server = restify.createServer({
  name: 'blob-stream-rest-server',
  version: '0.1.0'
})
server.use(restify.acceptParser(server.acceptable))
server.use(restify.queryParser())
server.use(restify.bodyParser())

server.get('/events/recent/:amount', function (req, res, next) {
  var files = fs.readdirSync(assetPrefix)
  files.forEach((file, index) => {
    var bitmap = fs.readFileSync(assetPrefix + file)
    files[index] = new Buffer(bitmap).toString('base64')
  })
  var headings = [
    'my great heading',
    'something to see',
    'wow, what is that?'
  ]
  var descriptions = [
    'Live long, and prosper.',
    'Space… the final frontier.',
    'Do you know the old Klingon proverb that revenge is a dish best served cold? It is very cold — in space.'
  ]
  var names = ['Spock', 'Tuvok', 'Seven of Nine']
  var blobs = [1, 2, 3]
  var ids = ['jio13jlai', 'hkasdfioe2', 'ahkfsdaoe']
  blobs.forEach(elem => {
    blobs[elem] = {
      'blobID': ids[elem],
      'heading': headings[elem],
      'description': descriptions[elem],
      'creator': names[elem],
      'dataURL': files[elem]
    }
  })
  res.send(blobs)
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
