var genBlobs = require('./generate-blobs')

module.exports = (assetPrefix) => {
  var events = []
  var blobs = genBlobs(assetPrefix)
  blobs.forEach(blob => {
    events.push({
      'verb': 'newBlob',
      'blobID': blob.id
    })
  })
  return events
}
