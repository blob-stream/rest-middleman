var fs = require('fs')

module.exports = (assetPrefix) => {
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
  var ids = ['jio13jlai', 'hkasdfioe2', 'ahkfsdaoe']

  var blobs = []
  files.forEach((_, index) => {
    blobs.push({
      'id': ids[index],
      'heading': headings[index],
      'description': descriptions[index],
      'creator': names[index],
      'dataURL': files[index]
    })
  })
  return blobs
}
