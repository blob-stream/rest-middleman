module.exports = blobs => {
  var votes = []
  blobs.forEach((blob, index) => {
    if (index % 2 === 0) {
      votes.push({
        verb: 'addVote',
        voter: 'Son Goku',
        blobID: blob.id
      })
    }
  })
  return votes
}
