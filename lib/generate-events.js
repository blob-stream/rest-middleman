module.exports = (blobs) => {
  var events = []
  blobs.forEach(blob => {
    events.push({
      'verb': 'newBlob',
      'blobID': blob.id
    })
  })
  return events
}
